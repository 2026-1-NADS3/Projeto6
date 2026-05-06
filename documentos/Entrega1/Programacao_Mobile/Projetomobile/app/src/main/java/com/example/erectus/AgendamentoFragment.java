package com.example.erectus;

import android.os.Bundle;
import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CalendarView;
import android.widget.TextView;
import android.widget.Toast;

public class AgendamentoFragment extends Fragment {

    private String dataEscolhida = "";

    public AgendamentoFragment() {}

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_agendamento, container, false);

        CalendarView calendarView = view.findViewById(R.id.calendarView);
        TextView tvDataSelecionada = view.findViewById(R.id.tvDataSelecionada);
        Button btnConfirmar = view.findViewById(R.id.btnConfirmarAgenda);

        // Pega a data quando o usuário clica no calendário
        calendarView.setOnDateChangeListener(new CalendarView.OnDateChangeListener() {
            @Override
            public void onSelectedDayChange(@NonNull CalendarView view, int year, int month, int dayOfMonth) {
                // O mês começa em 0 no Java, por isso somamos 1
                dataEscolhida = dayOfMonth + "/" + (month + 1) + "/" + year;
                tvDataSelecionada.setText("Data selecionada: " + dataEscolhida);
            }
        });

        // Ação do botão
        btnConfirmar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (dataEscolhida.isEmpty()) {
                    Toast.makeText(getActivity(), "Clique no calendário para escolher uma data!", Toast.LENGTH_SHORT).show();
                } else {
                    // Aqui no futuro a gente chama a API para ver os horários do dia
                    Toast.makeText(getActivity(), "Buscando horários para " + dataEscolhida + "...", Toast.LENGTH_SHORT).show();
                }
            }
        });

        return view;
    }
}