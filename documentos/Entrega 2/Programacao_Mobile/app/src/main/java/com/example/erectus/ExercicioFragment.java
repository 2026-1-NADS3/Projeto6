package com.example.erectus;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
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

public class ExercicioFragment extends Fragment {

    // Declaração manual das variáveis do ecrã
    private TextView txtTituloExercicioItem;
    private TextView txtDetalhesExercicioItem;
    private Button btnAvaliarExercicio;
    private Button btnIniciarExercicio;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_exercicio, container, false);

        // 1. Mapeamento explícito dos componentes do XML
        txtTituloExercicioItem = view.findViewById(R.id.txtTituloExercicioItem);
        txtDetalhesExercicioItem = view.findViewById(R.id.txtDetalhesExercicioItem);
        btnAvaliarExercicio = view.findViewById(R.id.btnAvaliarExercicio);
        btnIniciarExercicio = view.findViewById(R.id.btnIniciarExercicio);

        // 2. Chamar a função para buscar a rotina no Docker
        carregarExerciciosDaApi();

        // 3. Ação do Botão Avaliar: Abre o formulário de dor (RegistroDorActivity)
        if (btnAvaliarExercicio != null) {
            btnAvaliarExercicio.setOnClickListener(v -> {
                Intent intent = new Intent(getActivity(), RegistroDorActivity.class);
                startActivity(intent);
            });
        }

        // 4. Ação do Botão Iniciar
        if (btnIniciarExercicio != null) {
            btnIniciarExercicio.setOnClickListener(v -> {
                Toast.makeText(getActivity(), "A iniciar o exercício...", Toast.LENGTH_SHORT).show();
            });
        }

        return view;
    }

    private void carregarExerciciosDaApi() {
        // Abertura manual da Thread para a comunicação HTTP
        new Thread(() -> {
            try {
                // Rota configurada para aceder ao Docker através do emulador Android
                URL url = new URL("http://10.0.2.2:3000/api/exercicios");
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

                    // A API devolve um Array JSON com os exercícios
                    JSONArray jsonArray = new JSONArray(resposta.toString());

                    if (jsonArray.length() > 0) {
                        // Extração manual dos dados do primeiro exercício
                        JSONObject exercicio = jsonArray.getJSONObject(0);
                        String nome = exercicio.getString("nome");
                        String descricao = exercicio.getString("descricao");

                        // Atualização dos TextViews na Main Thread
                        if (getActivity() != null) {
                            getActivity().runOnUiThread(() -> {
                                if (txtTituloExercicioItem != null) txtTituloExercicioItem.setText(nome);
                                if (txtDetalhesExercicioItem != null) txtDetalhesExercicioItem.setText(descricao);
                            });
                        }
                    }
                } else {
                    if (getActivity() != null) {
                        getActivity().runOnUiThread(() -> Toast.makeText(getActivity(), "Falha ao carregar exercícios", Toast.LENGTH_SHORT).show());
                    }
                }
                conexao.disconnect();

            } catch (Exception e) {
                Log.e("API_ERRO", "Erro nos exercícios: " + e.getMessage());
                if (getActivity() != null) {
                    getActivity().runOnUiThread(() -> Toast.makeText(getActivity(), "Erro de ligação ao servidor", Toast.LENGTH_SHORT).show());
                }
            }
        }).start();
    }
}