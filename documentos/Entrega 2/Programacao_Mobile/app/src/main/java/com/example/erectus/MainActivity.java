package com.example.erectus; // Mantenha o seu package original

import android.os.Bundle;
import android.view.MenuItem;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.navigation.NavigationBarView;

public class MainActivity extends AppCompatActivity {

    private BottomNavigationView bottomNavigation;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // 1. Mapeando a barra de navegação do XML
        bottomNavigation = findViewById(R.id.bottomNavigation);

        // 2. Carrega a tela de Início (Dashboard) assim que o app abrir
        if (savedInstanceState == null) {
            carregarFragmento(new InicioFragment());
        }

        // 3. Lógica manual para ouvir os cliques no menu e trocar as telas
        bottomNavigation.setOnItemSelectedListener(new NavigationBarView.OnItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                int id = item.getItemId();

                if (id == R.id.nav_inicio) {
                    carregarFragmento(new InicioFragment());
                    return true;
                } else if (id == R.id.nav_progresso) {
                    carregarFragmento(new ProgressoFragment());
                    return true;
                } else if (id == R.id.nav_exercicio) {
                    carregarFragmento(new ExercicioFragment());
                    return true;
                } else if (id == R.id.nav_perfil) {
                    carregarFragmento(new PerfilFragment());
                    return true;
                }

                return false;
            }
        });
    }

    // Método criado manualmente para substituir os fragmentos no FrameLayout
    private void carregarFragmento(Fragment fragmento) {
        FragmentTransaction transaction = getSupportFragmentManager().beginTransaction();
        transaction.replace(R.id.fragmentContainer, fragmento);
        transaction.commit();
    }
}