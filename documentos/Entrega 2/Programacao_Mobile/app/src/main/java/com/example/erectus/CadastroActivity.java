package com.example.erectus;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import org.json.JSONObject;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class CadastroActivity extends AppCompatActivity {

    private EditText editNomeCadastro, editCpfCadastro, editNascimentoCadastro, editEmailCadastro, editSenhaCadastro;
    private Button btnCadastrar, btnVoltarLogin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cadastro);

        // 1. Mapeamento manual dos componentes da tela
        editNomeCadastro = findViewById(R.id.editNomeCadastro);
        editCpfCadastro = findViewById(R.id.editCpfCadastro);
        editNascimentoCadastro = findViewById(R.id.editNascimentoCadastro);
        editEmailCadastro = findViewById(R.id.editEmailCadastro);
        editSenhaCadastro = findViewById(R.id.editSenhaCadastro);
        btnCadastrar = findViewById(R.id.btnCadastrar);
        btnVoltarLogin = findViewById(R.id.btnVoltarLogin);

        // 2. Ação do Botão Cadastrar
        btnCadastrar.setOnClickListener(v -> {
            String nome = editNomeCadastro.getText().toString();
            String cpf = editCpfCadastro.getText().toString();
            String nascimento = editNascimentoCadastro.getText().toString();
            String email = editEmailCadastro.getText().toString();
            String senha = editSenhaCadastro.getText().toString();

            // Validação simples para não enviar dados vazios
            if (nome.isEmpty() || cpf.isEmpty() || email.isEmpty() || senha.isEmpty()) {
                Toast.makeText(CadastroActivity.this, "Preencha todos os campos obrigatórios!", Toast.LENGTH_SHORT).show();
            } else {
                registrarUsuarioNaApi(nome, cpf, nascimento, email, senha);
            }
        });

        // 3. Ação do Botão Voltar para Login
        btnVoltarLogin.setOnClickListener(v -> {
            // Fecha a tela de cadastro e volta para a tela anterior (Login)
            finish();
        });
    }

    private void registrarUsuarioNaApi(String nome, String cpf, String nascimento, String email, String senha) {
        // Nova Thread para operações de rede
        new Thread(() -> {
            try {
                // ATENÇÃO: Confirme se a sua rota de cadastro no Docker é "/api/pacientes" ou "/api/cadastro"
                URL url = new URL("http://10.0.2.2:3000/api/pacientes");
                HttpURLConnection conexao = (HttpURLConnection) url.openConnection();
                conexao.setRequestMethod("POST");
                conexao.setRequestProperty("Content-Type", "application/json; utf-8");
                conexao.setRequestProperty("Accept", "application/json");
                conexao.setDoOutput(true);

                // Montando o JSON com os dados do formulário
                JSONObject jsonEnvio = new JSONObject();
                jsonEnvio.put("nome_completo", nome);
                jsonEnvio.put("cpf", cpf);
                jsonEnvio.put("data_nascimento", nascimento);
                jsonEnvio.put("email", email);
                jsonEnvio.put("senha", senha);

                String jsonString = jsonEnvio.toString();

                // Disparando os dados
                try (OutputStream os = conexao.getOutputStream()) {
                    byte[] input = jsonString.getBytes("utf-8");
                    os.write(input, 0, input.length);
                }

                int codigoResposta = conexao.getResponseCode();

                // Se retornou 200 (OK) ou 201 (Created)
                if (codigoResposta == HttpURLConnection.HTTP_OK || codigoResposta == HttpURLConnection.HTTP_CREATED) {
                    runOnUiThread(() -> {
                        Toast.makeText(CadastroActivity.this, "Cadastro realizado com sucesso!", Toast.LENGTH_LONG).show();
                        // Redireciona para o Login
                        finish();
                    });
                } else {
                    runOnUiThread(() -> Toast.makeText(CadastroActivity.this, "Falha ao cadastrar. Código: " + codigoResposta, Toast.LENGTH_SHORT).show());
                }

                conexao.disconnect();

            } catch (Exception e) {
                Log.e("API_ERRO", "Erro no cadastro: " + e.getMessage());
                runOnUiThread(() -> Toast.makeText(CadastroActivity.this, "Erro de conexão com o servidor", Toast.LENGTH_SHORT).show());
            }
        }).start();
    }
}