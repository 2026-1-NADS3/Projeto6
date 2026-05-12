package com.example.erectus;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

public class ProgressoFragment extends Fragment {

    // Construtor vazio padrão
    public ProgressoFragment() {
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        // Infla (desenha) a tela a partir do arquivo XML correspondente
        View view = inflater.inflate(R.layout.fragment_progresso, container, false);

        // Chama o método estruturado para configurar o botão
        this.configurarBotaoSalvarDor(view);

        return view;
    }

    private void configurarBotaoSalvarDor(View view) {
        // ATENÇÃO: Substitua "R.id.btn_salvar_dor" pelo ID real que está no seu XML!
        Button btnSalvarDor = view.findViewById(R.id.btnRegistrarDor);

        if (btnSalvarDor != null) {
            btnSalvarDor.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // 1. Instanciamos o nosso banco de dados manualmente
                    BancoDeDadosHelper bancoHelper = new BancoDeDadosHelper(getContext());

                    // 2. Criamos o objeto de forma explícita
                    RegistroDor novaDor = new RegistroDor();
                    novaDor.setDataRegistro("11/05/2026");
                    novaDor.setNivelDor(5);

                    // 3. Mandamos salvar no SQLite
                    boolean sucesso = bancoHelper.adicionarRegistroDor(novaDor);

                    // 4. Mostramos um aviso na tela para confirmar que salvou
                    if (sucesso) {
                        Toast.makeText(getContext(), "Dor registrada offline com sucesso!", Toast.LENGTH_LONG).show();
                    } else {
                        Toast.makeText(getContext(), "Erro ao salvar no banco local.", Toast.LENGTH_SHORT).show();
                    }
                }
            });
        }
    }
}