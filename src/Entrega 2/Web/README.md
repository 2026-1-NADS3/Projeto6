Equipe Clínica Maya · FECAP 2026


---

### 📂 2. Arquivo: `src/Entrega 2/web/README.md`

```markdown
# 🌐 Clínica Maya - Web Admin Panel

> **Painel Administrativo para Fisioterapeutas e Gestores da Clínica Maya.**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Status](https://img.shields.io/badge/Frontend-Ready-blue?style=for-the-badge)

## 📖 Sobre
Interface desenvolvida em **React** para gestão completa de pacientes. Permite a avaliação de prontuários em tempo real, controle de agenda e visualização de dashboards financeiros.

## 🛠️ Stack de Tecnologias

| Tecnologia | Função |
| :--- | :--- |
| **React + Vite** | Framework e ferramenta de Build rápida |
| **Tailwind CSS** | Estilização baseada em utilitários e responsividade |
| **Axios** | Cliente HTTP para consumo da API REST |
| **Lucide Icons** | Biblioteca de ícones modernos |

## 🚀 Como Rodar o Painel

```bash
# 1. Instale as dependências (Node instalado)
npm install

# 2. Inicie o servidor de desenvolvimento
npm run dev
Nota: Acesse em http://localhost:5173

✅ Funcionalidades Implementadas
[x] Login Administrativo: Controle de acesso por cargo.

[x] Gestão de Pacientes: Cadastro e edição de prontuários.

[x] Dashboard Financeiro: Gráficos de receita e despesa.

[x] Banco de Exercícios: Filtros dinâmicos por categoria.

🔗 Conexão Ponta a Ponta
Este painel consome a API rodando na porta 3000.
O fluxo de dados segue o padrão:
Browser (React) ↔ API (Node/Docker) ↔ Database (MySQL)

📂 Estrutura de Pastas
Plaintext
web/
├── 📁 public/       # Ativos estáticos (imagens/logos)
├── 📁 src/
│   ├── 📁 components/ # Componentes reutilizáveis (botões, cards)
│   ├── 📁 pages/      # Páginas principais (Dashboard, Agenda)
│   ├── 📁 services/   # Configuração do Axios e chamadas de API
│   └── main.jsx       # Entrada do projeto React
└── index.html         # Arquivo base HTML
Equipe Clínica Maya · FECAP 2026
