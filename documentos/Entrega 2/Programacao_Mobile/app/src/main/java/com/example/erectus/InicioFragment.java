package com.example.erectus; // Mantenha o seu package original

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.cardview.widget.CardView;
import androidx.fragment.app.Fragment;
import org.json.JSONArray;
import org.json.JSONObject;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class InicioFragment extends Fragment {

    // Variáveis (ajuste os IDs consoante os que colocou no seu XML, se necessário)
    private CardView btnCardAgendamento;
    private CardView btnCardProntuario;
    private CardView btnCardContato;
    private TextView txtProximoAgendamento; // Se quiser exibir a data no ecrã

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_inicio, container, false);

        // 1. Mapeamento manual dos botões do Dashboard
        btnCardAgendamento = view.findViewById(R.id.btnCardAgendamento);
        btnCardProntuario = view.findViewById(R.id.btnCardProntuario);
        btnCardContato = view.findViewById(R.id.btnCardContato);

        // Exemplo: um TextView que possa ter adicionado para mostrar a próxima consulta
        // txtProximoAgendamento = view.findViewById(R.id.txtProximoAgendamento);

        // 2. Ações dos cartões
        if (btnCardAgendamento != null) {
            btnCardAgendamento.setOnClickListener(v ->
                    Toast.makeText(getActivity(), "A abrir Agendamentos...", Toast.LENGTH_SHORT).show()
            );
        }

        if (btnCardProntuario != null) {
            btnCardProntuario.setOnClickListener(v ->
                    Toast.makeText(getActivity(), "A abrir Prontuário...", Toast.LENGTH_SHORT).show()
            );
        }

        if (btnCardContato != null) {
            btnCardContato.setOnClickListener(v ->
                    Toast.makeText(getActivity(), "A abrir Contactos...", Toast.LENGTH_SHORT).show()
            );
        }

        // 3. Chamada à API para buscar a próxima consulta
        carregarProximoAgendamento();

        return view;
    }

    private void carregarProximoAgendamento() {
        new Thread(() -> {
            try {
                // Rota configurada para puxar os agendamentos do Docker
                URL url = new URL("http://10.0.2.2:3000/api/agendamentos");
                HttpURLConnection conexao = (HttpURLConnection) url.openConnection();
                conexao.setRequestMethod("GET");
                conexao.setRequestProperty("Accept", "application/json");

                int codigoResposta = conexao.getResponseCode();

                if (codigoResposta == HttpURLConnection.HTTP_OK) {
                    BufferedReader br = new BufferedReader(new InputStreamReader(conexao.getInputStream(), "utf-8"));
                    StringBuilder resposta = new StringBuilder();
                    String linha;
                    while ((linha = br.readLine()) != null) {
                        resposta.append(linha.trim());
                    }

                    // Lê o Array JSON dos agendamentos
                    JSONArray jsonArray = new JSONArray(resposta.toString());

                    if (jsonArray.length() > 0) {
                        // Apanha a primeira consulta da lista
                        JSONObject agendamento = jsonArray.getJSONObject(0);
                        String data = agendamento.getString("data_agendamento");
                        String hora = agendamento.getString("hora_agendamento");
                        String status = agendamento.getString("status");

                        String infoConsulta = "Próxima consulta: " + data + " às " + hora + " (" + status + ")";

                        // Se tiver um TextView dedicado a isto, pode atualizá-lo aqui:
                        /*
                        if (getActivity() != null) {
                            getActivity().runOnUiThread(() -> {
                                if (txtProximoAgendamento != null) txtProximoAgendamento.setText(infoConsulta);
                            });
                        }
                        */
                        Log.d("API_MAYA", infoConsulta); // Apenas regista no log para confirmar que funcionou
                    }
                }
                conexao.disconnect();

            } catch (Exception e) {
                Log.e("API_ERRO", "Erro ao carregar agendamentos: " + e.getMessage());
            }
        }).start();
    }
}