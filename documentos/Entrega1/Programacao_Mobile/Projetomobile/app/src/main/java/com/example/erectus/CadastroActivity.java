package com.example.erectus;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import androidx.appcompat.app.AppCompatActivity;

public class CadastroActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cadastro);

        // 1. Vinculando os campos com os IDs REAIS do seu XML
        EditText etNome = findViewById(R.id.etNome);
        EditText etEmail = findViewById(R.id.etCpf); // No seu XML não tem campo e-mail, usei o CPF como exemplo
        EditText etSenha = findViewById(R.id.etSenhaCadastro);

        Button btnCadastrar = findViewById(R.id.btnCadastrar);
        Button btnTabLogin = findViewById(R.id.btnTabLogin);

        // 2. Ação do botão CADASTRAR (Leva para a Main)
        btnCadastrar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Aqui no futuro salvaremos os dados
                Intent intent = new Intent(CadastroActivity.this, MainActivity.class);
                startActivity(intent);
                finish(); // Fecha a tela de cadastro
            }
        });

        // 3. Ação do botão LOGIN (Caso ele queira voltar)
        btnTabLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(CadastroActivity.this, LoginActivity.class);
                startActivity(intent);
                finish();
            }
        });
    }
}