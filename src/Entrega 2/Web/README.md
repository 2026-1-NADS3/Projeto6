# 🌐 Clínica Maya — Web Portal

> **Painel Administrativo e Clínico para Fisioterapeutas e Gestores.** > Este módulo representa o ecossistema Web da Clínica Maya Yoshiko Yamamoto, integrado ao Backend Dockerizado e ao App Mobile.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

---

## 📖 Sobre o Módulo
O portal Web é a central de inteligência do fisioterapeuta. Nele, é possível realizar o acompanhamento completo de pacientes de **Reeducação Postural Global (RPG)**, gerir a agenda da clínica e monitorar a saúde financeira em um dashboard dinâmico.

---

## 🛠️ Stack de Tecnologias

| Categoria | Tecnologia | Função |
| :--- | :--- | :--- |
| **Framework** | React 18+ | Biblioteca base para construção da UI reativa |
| **Build Tool** | Vite | Servidor de desenvolvimento e bundling de alta performance |
| **Estilização** | Tailwind CSS | Framework utilitário para design responsivo e moderno |
| **Comunicação** | Axios | Consumo da API REST do Backend |
| **Ícones** | Lucide React | Biblioteca de ícones vetoriais leves |

---

## ✅ Funcionalidades Implementadas

| Funcionalidade | Descrição | Status |
| :--- | :--- | :--- |
| **Dashboard Clínico** | Visão geral de atendimentos e indicadores financeiros. | ✅ Finalizado |
| **Gestão de Pacientes** | CRUD completo e histórico de prontuários eletrônicos. | ✅ Finalizado |
| **Banco de Exercícios** | Biblioteca de movimentos com filtros por categoria. | ✅ Finalizado |
| **Controle de Agenda** | Visualização de sessões e horários disponíveis. | ✅ Finalizado |
| **Módulo Financeiro** | Registro de entradas, saídas e métodos de pagamento. | ✅ Finalizado |

---

## 📂 Estrutura de Pastas

```text
src/
├── 📁 components/    # Componentes reutilizáveis (Botões, Inputs, Cards)
├── 📁 assets/        # Imagens, logos e vetores estáticos
├── 📁 pages/         # Páginas principais (Dashboard, Pacientes, Login)
├── 📁 services/      # Configuração do Axios e chamadas para a API
├── 📁 hooks/         # Lógicas de estado compartilhadas
├── 📁 layouts/       # Templates de navegação (Sidebar, Navbar)
└── main.jsx          # Ponto de entrada do React
