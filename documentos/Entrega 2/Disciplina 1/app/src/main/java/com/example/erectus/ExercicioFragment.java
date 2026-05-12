package com.example.erectus;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import org.json.JSONArray;
import org.json.JSONObject;

public class ExercicioFragment extends Fragment {

    // Variáveis visuais da tela mapeadas
    private TextView tvNomeEx1, tvDescEx1;
    private TextView tvNomeEx2, tvDescEx2;

    public ExercicioFragment() {
        // Construtor vazio
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_exercicio, container, false);

        // 1. Mapeia os componentes do XML para o Java pelos IDs corretos
        tvNomeEx1 = view.findViewById(R.id.tvNomeEx1);
        tvDescEx1 = view.findViewById(R.id.tvDescEx1);
        tvNomeEx2 = view.findViewById(R.id.tvNomeEx2);
        tvDescEx2 = view.findViewById(R.id.tvDescEx2);

        // 2. Dispara a busca assim que a tela abre
        this.buscarExerciciosDaAPI();

        return view;
    }

    private void buscarExerciciosDaAPI() {
        ExecutorService executor = Executors.newSingleThreadExecutor();

        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    URL url = new URL("http://10.0.2.2:3000/api/exercicios");
                    HttpURLConnection conexao = (HttpURLConnection) url.openConnection();
                    conexao.setRequestMethod("GET");
                    conexao.setRequestProperty("Content-Type", "application/json");

                    if (conexao.getResponseCode() == 200) {
                        BufferedReader leitor = new BufferedReader(new InputStreamReader(conexao.getInputStream()));
                        StringBuilder resposta = new StringBuilder();
                        String linha;

                        while ((linha = leitor.readLine()) != null) {
                            resposta.append(linha);
                        }
                        leitor.close();

                        JSONArray jsonArray = new JSONArray(resposta.toString());

                        // Extrai os dados do PRIMEIRO exercício do JSON (se a lista não estiver vazia)
                        if (jsonArray.length() > 0) {
                            JSONObject obj1 = jsonArray.getJSONObject(0);
                            final String nome1 = obj1.getString("nome");
                            final String cat1 = obj1.getString("categoria");

                            // Retorna para a Thread principal para atualizar a tela visualmente
                            if (getActivity() != null) {
                                getActivity().runOnUiThread(new Runnable() {
                                    @Override
                                    public void run() {
                                        tvNomeEx1.setText(nome1);
                                        tvDescEx1.setText("Categoria: " + cat1);
                                    }
                                });
                            }
                        }

                        // Extrai os dados do SEGUNDO exercício do JSON (se houver mais de um)
                        if (jsonArray.length() > 1) {
                            JSONObject obj2 = jsonArray.getJSONObject(1);
                            final String nome2 = obj2.getString("nome");
                            final String cat2 = obj2.getString("categoria");

                            if (getActivity() != null) {
                                getActivity().runOnUiThread(new Runnable() {
                                    @Override
                                    public void run() {
                                        tvNomeEx2.setText(nome2);
                                        tvDescEx2.setText("Categoria: " + cat2);
                                    }
                                });
                            }
                        }
                    }
                    conexao.disconnect();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }
}