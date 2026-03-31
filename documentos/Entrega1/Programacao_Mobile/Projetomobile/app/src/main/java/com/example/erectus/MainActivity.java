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
        // Usamos um método auxiliar que criamos logo abaixo
        substituirFragment(new InicioFragment());

        // 3. Escutamos o que acontece quando o usuário clica nos ícones da barra
        bottomNav.setOnItemSelectedListener(new NavigationBarView.OnItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                // Criamos um Fragment provisório
                Fragment fragmentSelecionado = null;

                // Verificamos qual item foi clicado usando o ID que definimos no menu_navegacao.xml
                if (item.getItemId() == R.id.nav_inicio) {
                    fragmentSelecionado = new InicioFragment();
                } else if (item.getItemId() == R.id.nav_progresso) {
                    fragmentSelecionado = new ProgressoFragment();
                } else if (item.getItemId() == R.id.nav_exercicio) {
                    fragmentSelecionado = new ExercicioFragment();
                } else if (item.getItemId() == R.id.nav_perfil) {
                    fragmentSelecionado = new PerfilFragment(); // Você já criou esse ou quer o código?
                }

                // Se houver um fragment selecionado, nós fazemos a troca
                if (fragmentSelecionado != null) {
                    substituirFragment(fragmentSelecionado);
                    return true;
                }
                return false;
            }
        });
    }

    // Método auxiliar (uma "receita") para fazer a troca dos Fragments
    private void substituirFragment(Fragment fragment) {
        // Pega o gerenciador de fragmentos
        // Inicia uma transação
        // Substitui o conteúdo do 'fragmentContainer' pelo novo fragment
        // Confirma a transação (commit)
        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.fragmentContainer, fragment)
                .commit();
    }
}