package com.example.erectus;

import android.os.Bundle;
import androidx.fragment.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Toast;

public class ProgressoFragment extends Fragment {

    public ProgressoFragment() {
        // Construtor vazio obrigatório
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        // 1. Inflamos o layout primeiro para poder achar os botões dentro dele
        View view = inflater.inflate(R.layout.fragment_progresso, container, false);

        // 2. Vinculamos o botão de Registrar Dor
        Button btnRegistrarDor = view.findViewById(R.id.btnRegistrarDor);

        // 3. Ação do botão
        btnRegistrarDor.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Por enquanto, mostra apenas um aviso na tela (Toast)
                // Na entrega final, aqui você abriria um formulário ou salvaria no banco
                Toast.makeText(getActivity(), "Progresso de dor registrado!", Toast.LENGTH_SHORT).show();
            }
        });

        return view;
    }
}