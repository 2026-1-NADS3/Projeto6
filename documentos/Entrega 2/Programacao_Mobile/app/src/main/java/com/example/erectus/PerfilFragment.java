package com.example.erectus; // Mantenha o seu package original

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

public class PerfilFragment extends Fragment {

    private TextView txtNomeUsuario;
    private TextView txtEmailPerfil;
    private TextView txtPlanoPerfil;
    private Button btnSairConta;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        // Nos Fragments, precisamos de "inflar" o layout e guardá-lo numa variável View
        View view = inflater.inflate(R.layout.fragment_perfil, container, false);

        // 1. Mapeamento manual dos componentes (notar o uso do "view.findViewById")
        txtNomeUsuario = view.findViewById(R.id.txtNomeUsuario);
        txtEmailPerfil = view.findViewById(R.id.txtEmailPerfil);
        txtPlanoPerfil = view.findViewById(R.id.txtPlanoPerfil);
        btnSairConta = view.findViewById(R.id.btnSairConta);

        // 2. Chamar a função para ir buscar os dados à API assim que o ecrã abre
        carregarDadosPerfilDaApi();

        // 3. Ação do Botão Sair da Conta
        btnSairConta.setOnClickListener(v -> {
            // Volta para a tela de Login e fecha a MainActivity
            Intent intent = new Intent(getActivity(), LoginActivity.class);
            startActivity(intent);
            if (getActivity() != null) {
                getActivity().finish();
            }
        });

        return view;
    }

    private void carregarDadosPerfilDaApi() {
        // Nova Thread para operações de rede (sempre manual)
        new Thread(() -> {
            try {
                // Rota GET para buscar a lista de pacientes no Docker
                URL url = new URL("http://10.0.2.2:3000/api/pacientes");
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

                    // A resposta desta rota é um Array (lista) de pacientes, conforme o seu JsonMaya.txt
                    JSONArray jsonArray = new JSONArray(resposta.toString());

                    if (jsonArray.length() > 0) {
                        // Vamos apanhar o primeiro paciente da lista (índice 0) para mostrar no perfil
                        JSONObject paciente = jsonArray.getJSONObject(0);
                        String nome = paciente.getString("nome_completo");
                        // O seu JSON de exemplo tem profissao no lugar de email, mas vamos buscar caso exista
                        String detalhes = "CPF: " + paciente.getString("cpf");

                        // Voltar à Main Thread para atualizar o ecrã
                        if (getActivity() != null) {
                            getActivity().runOnUiThread(() -> {
                                txtNomeUsuario.setText(nome);
                                txtEmailPerfil.setText(detalhes);
                                txtPlanoPerfil.setText("Plano Ativo");
                            });
                        }
                    }
                } else {
                    if (getActivity() != null) {
                        getActivity().runOnUiThread(() -> Toast.makeText(getActivity(), "Falha ao carregar perfil.", Toast.LENGTH_SHORT).show());
                    }
                }
                conexao.disconnect();

            } catch (Exception e) {
                Log.e("API_ERRO", "Erro ao carregar perfil: " + e.getMessage());
                if (getActivity() != null) {
                    getActivity().runOnUiThread(() -> Toast.makeText(getActivity(), "Erro de ligação ao servidor", Toast.LENGTH_SHORT).show());
                }
            }
        }).start();
    }
}