package com.example.erectus;

import android.os.Bundle;
import androidx.fragment.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Toast;

public class InicioFragment extends Fragment {

    public InicioFragment() {
        // Construtor vazio obrigatório
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        // 1. Inflamos o layout
        View view = inflater.inflate(R.layout.fragment_inicio, container, false);

        // 2. Vinculamos os botões que você criou no XML
        Button btnGerenciar = view.findViewById(R.id.btnGerenciarConsulta);
        Button btnContinuar = view.findViewById(R.id.btnContinuar);

        // 3. Ação do botão GERENCIAR
        btnGerenciar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(getActivity(), "Abrindo agenda da Clínica Liberdade...", Toast.LENGTH_SHORT).show();
            }
        });

        // 4. Ação do botão CONTINUAR
        btnContinuar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Aqui você pode fazer ele pular direto para o ExercicioFragment
                // ou apenas mostrar o aviso por enquanto
                Toast.makeText(getActivity(), "Retomando seus treinos!", Toast.LENGTH_SHORT).show();
            }
        });

        return view;
    }
}