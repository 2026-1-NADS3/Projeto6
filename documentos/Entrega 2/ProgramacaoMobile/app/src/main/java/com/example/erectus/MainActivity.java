package com.example.erectus;

import android.os.Bundle;
import android.view.MenuItem;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.navigation.NavigationBarView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // 1. Vinculamos a barra de navegação inferior
        BottomNavigationView bottomNav = findViewById(R.id.bottomNavigation);

        // 2. Definimos qual tela abre primeiro (a tela de Início)
        substituirFragment(new InicioFragment());

        // 3. Escutamos o que acontece quando o usuário clica nos ícones da barra
        bottomNav.setOnItemSelectedListener(new NavigationBarView.OnItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                Fragment fragmentSelecionado = null;
                int itemId = item.getItemId();

                // Verificamos qual item foi clicado de forma manual
                if (itemId == R.id.nav_inicio) {
                    fragmentSelecionado = new InicioFragment();
                } else if (itemId == R.id.nav_progresso) {
                    fragmentSelecionado = new ProgressoFragment();
                } else if (itemId == R.id.nav_exercicio) {
                    fragmentSelecionado = new ExercicioFragment();
                } else if (itemId == R.id.nav_perfil) {
                    fragmentSelecionado = new PerfilFragment();
                }

                // OBS: Se você criou o nav_agendamento no XML, pode descomentar as duas linhas abaixo:
                // else if (itemId == R.id.nav_agendamento) {
                //    fragmentSelecionado = new AgendamentoFragment();
                // }

                // Se houver um fragment selecionado, fazemos a troca na tela
                if (fragmentSelecionado != null) {
                    substituirFragment(fragmentSelecionado);
                    return true;
                }
                return false;
            }
        });
    }

    // Método auxiliar (manual) para substituir os Fragments
    private void substituirFragment(Fragment fragment) {
        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.fragmentContainer, fragment)
                .commit();
    }
}