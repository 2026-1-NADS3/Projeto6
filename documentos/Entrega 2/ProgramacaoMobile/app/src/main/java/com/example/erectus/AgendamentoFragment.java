package com.example.erectus;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CalendarView;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;

public class AgendamentoFragment extends Fragment {

    private TextView tvDataSelecionada;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        // Vinculamos o Java com o XML que criamos no Passo 1
        View view = inflater.inflate(R.layout.fragment_agendamento, container, false);

        // Encontramos os componentes do XML
        CalendarView calendarView = view.findViewById(R.id.calendarView);
        tvDataSelecionada = view.findViewById(R.id.tvDataSelecionada);

        // Escuta o que acontece quando o usuário clica numa data
        calendarView.setOnDateChangeListener(new CalendarView.OnDateChangeListener() {
            @Override
            public void onSelectedDayChange(@NonNull CalendarView view, int year, int month, int dayOfMonth) {
                // Prepara a data para mostrar no texto
                Calendar calendar = Calendar.getInstance();
                calendar.set(year, month, dayOfMonth);

                SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy", Locale.getDefault());
                String selectedDate = dateFormat.format(calendar.getTime());

                // Muda o texto na tela para mostrar a data que o usuário escolheu
                tvDataSelecionada.setText("Agendamentos para: " + selectedDate);
            }
        });

        return view;
    }
}