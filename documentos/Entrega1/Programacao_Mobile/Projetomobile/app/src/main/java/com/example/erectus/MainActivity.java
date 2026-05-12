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

        BottomNavigationView bottomNav = findViewById(R.id.bottomNavigation);
        substituirFragment(new InicioFragment());

        bottomNav.setOnItemSelectedListener(new NavigationBarView.OnItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                Fragment fragmentSelecionado = null;

                if (item.getItemId() == R.id.nav_inicio) {
                    fragmentSelecionado = new InicioFragment();
                } else if (item.getItemId() == R.id.nav_progresso) {
                    fragmentSelecionado = new ProgressoFragment();
                } else if (item.getItemId() == R.id.nav_exercicio) {
                    fragmentSelecionado = new ExercicioFragment();
                } else if (item.getItemId() == R.id.nav_agendamento) {
                    // Aqui entra o Fragment novo que criamos!
                    fragmentSelecionado = new AgendamentoFragment();
                } else if (item.getItemId() == R.id.nav_perfil) {
                    fragmentSelecionado = new PerfilFragment();
                }

                if (fragmentSelecionado != null) {
                    substituirFragment(fragmentSelecionado);
                    return true;
                }
                return false;
            }
        });
    }

    private void substituirFragment(Fragment fragment) {
        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.fragmentContainer, fragment)
                .commit();
    }
}