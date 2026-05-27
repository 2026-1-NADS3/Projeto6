package com.example.erectus; // Mantenha o seu package original

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import org.json.JSONArray;
import org.json.JSONObject;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class ProgressoFragment extends Fragment {

    // Declaração manual dos componentes do ecrã
    private TextView txtTituloExercicioHistorico;
    private TextView txtDetalhesExercicioHistorico;
    private TextView txtDataProgresso;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_progresso, container, false);

        // 1. Mapeamento explícito ao estilo tradicional
        txtTituloExercicioHistorico = view.findViewById(R.id.txtTituloExercicioHistorico);
        txtDetalhesExercicioHistorico = view.findViewById(R.id.txtDetalhesExercicioHistorico);
        txtDataProgresso = view.findViewById(R.id.txtDataProgresso);

        // 2. Chamar a função para buscar o relatório no Docker
        carregarRelatorioDaApi();

        return view;
    }

    private void carregarRelatorioDaApi() {
        // Nova Thread para não bloquear a interface principal
        new Thread(() -> {
            try {
                // Rota configurada para o relatório do paciente ID 1
                URL url = new URL("http://10.0.2.2:3000/api/pacientes/1/relatorio");
                HttpURLConnection conexao = (HttpURLConnection) url.openConnection();
                conexao.setRequestMethod("GET");
                conexao.setRequestProperty("Accept", "application/json");

                int codigoResposta = conexao.getResponseCode();

                if (codigoResposta == HttpURLConnection.HTTP_OK) {
                    BufferedReader br = new BufferedReader(new InputStreamReader(conexao.getInputStream(), "utf-8"));
                    StringBuilder resposta = new StringBuilder();
                    String linha;
                    while ((linha = br.readLine()) != null) {
                        resposta.append(linha.trim());
                    }

                    // A resposta aqui é um Objeto JSON (e não um Array)
                    JSONObject jsonRetorno = new JSONObject(resposta.toString());

                    if (jsonRetorno.has("ultima_prescricao")) {
                        JSONObject prescricao = jsonRetorno.getJSONObject("ultima_prescricao");
                        String data = prescricao.getString("data_prescricao");

                        JSONArray itens = prescricao.getJSONArray("itens");

                        if (itens.length() > 0) {
                            // Extraímos o primeiro exercício da lista da prescrição
                            JSONObject primeiroItem = itens.getJSONObject(0);
                            String nomeExercicio = primeiroItem.getString("nome_exercicio");
                            String series = primeiroItem.getString("series");
                            String repeticoes = primeiroItem.getString("repeticoes");

                            // Montamos o texto detalhado manualmente
                            String detalhes = series + " séries de " + repeticoes + " repetições — Prescrito";

                            // Atualizamos a interface de volta na Main Thread
                            if (getActivity() != null) {
                                getActivity().runOnUiThread(() -> {
                                    if (txtDataProgresso != null) txtDataProgresso.setText("Data da Prescrição: " + data);
                                    if (txtTituloExercicioHistorico != null) txtTituloExercicioHistorico.setText(nomeExercicio);
                                    if (txtDetalhesExercicioHistorico != null) txtDetalhesExercicioHistorico.setText(detalhes);
                                });
                            }
                        }
                    }
                } else {
                    if (getActivity() != null) {
                        getActivity().runOnUiThread(() -> Toast.makeText(getActivity(), "Sem relatório disponível", Toast.LENGTH_SHORT).show());
                    }
                }
                conexao.disconnect();

            } catch (Exception e) {
                Log.e("API_ERRO", "Erro ao carregar relatório: " + e.getMessage());
                if (getActivity() != null) {
                    getActivity().runOnUiThread(() -> Toast.makeText(getActivity(), "Erro de ligação ao servidor", Toast.LENGTH_SHORT).show());
                }
            }
        }).start();
    }
}