package com.example.erectus;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

public class PerfilFragment extends Fragment {

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        // Carrega o layout visual do perfil
        View view = inflater.inflate(R.layout.fragment_perfil, container, false);

        // Encontra o botão de sair pelo ID.
        // ATENÇÃO: Se no seu XML (fragment_perfil.xml) o botão tiver outro ID, mude a palavra btnSairConta ali embaixo.
        Button btnSair = view.findViewById(R.id.btnSair);

        // Se o botão for encontrado, configura o clique nele
        if (btnSair != null) {
            btnSair.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Redireciona para a tela de Login
                    Intent intent = new Intent(getActivity(), LoginActivity.class);
                    startActivity(intent);

                    // Fecha a MainActivity para o usuário não conseguir voltar clicando na setinha do celular
                    if (getActivity() != null) {
                        getActivity().finish();
                    }
                }
            });
        }

        return view;
    }
}