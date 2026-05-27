package com.example.erectus; // Mantenha o seu package original aqui

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.SeekBar;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

public class RegistroDorActivity extends AppCompatActivity {

    // Declarando os componentes da tela
    private TextView txtNivelDorValor;
    private SeekBar seekBarDor;
    private EditText editObsDor;
    private Button btnSalvarDor;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registro_dor);

        // 1. Vinculando as variáveis aos IDs do XML (Estrutura manual)
        txtNivelDorValor = findViewById(R.id.txtNivelDorValor);
        seekBarDor = findViewById(R.id.seekBarDor);
        editObsDor = findViewById(R.id.editObsDor);
        btnSalvarDor = findViewById(R.id.btnSalvarDor);

        // 2. Lógica da Barra de Dor (Atualiza o número na tela dinamicamente)
        seekBarDor.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                // Transforma o progresso (int) em texto (String) e atualiza o número central
                txtNivelDorValor.setText(String.valueOf(progress));
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {
                // Método obrigatório, mas não precisamos de ação ao tocar
            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {
                // Método obrigatório, mas não precisamos de ação ao soltar
            }
        });

        // 3. Lógica do Botão Salvar
        btnSalvarDor.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Capturando os dados para salvar no banco depois
                String notaDor = txtNivelDorValor.getText().toString();
                String observacao = editObsDor.getText().toString();

                // Mensagem temporária para testarmos se o botão funciona
                Toast.makeText(RegistroDorActivity.this, "Avaliação salva! Dor registrada: " + notaDor, Toast.LENGTH_SHORT).show();

                // Fecha esta tela e retorna para a lista de exercícios
                finish();
            }
        });
    }
}