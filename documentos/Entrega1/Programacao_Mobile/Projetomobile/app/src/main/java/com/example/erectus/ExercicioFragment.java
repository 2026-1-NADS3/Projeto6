package com.example.erectus;

import android.os.Bundle;
import androidx.fragment.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.cardview.widget.CardView;

public class ExercicioFragment extends Fragment {

    // Variável numérica para o professor ver a "integração de dados"
    private int totalCalorias = 0;
    private TextView tvTotalCalorias;

    public ExercicioFragment() {}

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_exercicio, container, false);

        tvTotalCalorias = view.findViewById(R.id.tvTotalCalorias);
        CardView cardEx1 = view.findViewById(R.id.cardEx1);
        CardView cardEx2 = view.findViewById(R.id.cardEx2);

        cardEx1.setOnClickListener(v -> somarCalorias(50));
        cardEx2.setOnClickListener(v -> somarCalorias(80));

        return view;
    }

    // Método de análise simples: soma e atualiza a tela
    private void somarCalorias(int valor) {
        totalCalorias += valor;
        tvTotalCalorias.setText(totalCalorias + " kcal");
    }
}