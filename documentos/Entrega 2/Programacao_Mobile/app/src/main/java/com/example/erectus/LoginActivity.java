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

public class LoginActivity extends AppCompatActivity {

    private EditText editEmail;
    private EditText editSenha;
    private Button btnLogin;
    private Button btnIrParaCadastro;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        // Mapeando os componentes do XML
        editEmail = findViewById(R.id.editEmail);
        editSenha = findViewById(R.id.editSenha);
        btnLogin = findViewById(R.id.btnLogin);
        btnIrParaCadastro = findViewById(R.id.btnIrParaCadastro);

        // Ação do Botão Login
        btnLogin.setOnClickListener(v -> {
            String emailDigitado = editEmail.getText().toString();
            String senhaDigitada = editSenha.getText().toString();

            if (!emailDigitado.isEmpty() && !senhaDigitada.isEmpty()) {
                fazerLoginNaApi(emailDigitado, senhaDigitada);
            } else {
                Toast.makeText(LoginActivity.this, "Preencha e-mail e senha", Toast.LENGTH_SHORT).show();
            }
        });

        // Ação para ir para a tela de Cadastro
        btnIrParaCadastro.setOnClickListener(v -> {
            Intent intent = new Intent(LoginActivity.this, CadastroActivity.class);
            startActivity(intent);
        });
    }

    private void fazerLoginNaApi(String email, String senha) {
        // O Android exige que operações de rede rodem fora da Main Thread
        new Thread(() -> {
            try {
                // 1. Configurando a URL do Docker no Emulador
                URL url = new URL("http://10.0.2.2:3000/api/login");
                HttpURLConnection conexao = (HttpURLConnection) url.openConnection();
                conexao.setRequestMethod("POST");
                conexao.setRequestProperty("Content-Type", "application/json; utf-8");
                conexao.setRequestProperty("Accept", "application/json");
                conexao.setDoOutput(true);

                // 2. Montando o JSON manualmente
                JSONObject jsonEnvio = new JSONObject();
                jsonEnvio.put("email", email);
                jsonEnvio.put("senha", senha);
                String jsonString = jsonEnvio.toString();

                // 3. Enviando os dados para a API
                try (OutputStream os = conexao.getOutputStream()) {
                    byte[] input = jsonString.getBytes("utf-8");
                    os.write(input, 0, input.length);
                }

                // 4. Lendo a resposta da API
                int codigoResposta = conexao.getResponseCode();
                if (codigoResposta == HttpURLConnection.HTTP_OK) {
                    BufferedReader br = new BufferedReader(new InputStreamReader(conexao.getInputStream(), "utf-8"));
                    StringBuilder resposta = new StringBuilder();
                    String linha;
                    while ((linha = br.readLine()) != null) {
                        resposta.append(linha.trim());
                    }

                    // 5. Tratando o JSON de retorno
                    JSONObject jsonRetorno = new JSONObject(resposta.toString());
                    boolean sucesso = jsonRetorno.getBoolean("sucesso");

                    if (sucesso) {
                        // Voltando para a Main Thread para mudar de tela e mostrar mensagens
                        runOnUiThread(() -> {
                            Toast.makeText(LoginActivity.this, "Login realizado com sucesso!", Toast.LENGTH_SHORT).show();
                            // Vai para a tela Início
                            Intent intent = new Intent(LoginActivity.this, MainActivity.class);
                            startActivity(intent);
                            finish(); // Fecha a tela de login
                        });
                    }
                } else {
                    runOnUiThread(() -> Toast.makeText(LoginActivity.this, "Erro nas credenciais", Toast.LENGTH_SHORT).show());
                }
                conexao.disconnect();

            } catch (Exception e) {
                Log.e("API_ERRO", "Erro de conexão: " + e.getMessage());
                runOnUiThread(() -> Toast.makeText(LoginActivity.this, "Erro ao conectar com o servidor", Toast.LENGTH_SHORT).show());
            }
        }).start();
    }
}