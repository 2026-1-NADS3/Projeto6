# 🏥 Clínica Maya — Fisioterapia & RPG
> **Sistema Integrado de Gestão Clínica e Acompanhamento de Pacientes**

<p align="center">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhZPrRa89Kma0ZZogxm0pi-tCn_TLKeHGVxywp-LXAFGR3B1DPouAJYHgKZGV0XTEf4AE&usqp=CAU" alt="FECAP Logo" width="200">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker">
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Android-3DDC84?style=flat-square&logo=android&logoColor=white" alt="Android">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white" alt="MySQL">
</p>

---

## 👥 Equipe: ERECTUS (PI 3ADS FECAP 2026)

* **[Gustavo Moura](https://www.linkedin.com/in/gustavomoura3112)** — Fullstack & Infra (Docker/API)
* **[Lucas Corsino](https://www.linkedin.com/in/lucas-soares-corsino-885306288/)** — Frontend Web & UI/UX
* **Guilherme Gomes Salvadeo** — Mobile Developer (Android)
* **[Manoel Rondon](https://www.linkedin.com/in/manoel-rondon)** — Analista de QA & Documentação
* **Matheus** — Database Engineer

**Professores Orientadores:** Rodrigo da Rosa, Francisco Escobar, Aimar Lopes, Jefferson de Oliveira

---

## 📖 Sobre o Projeto

O **Sistema Clínica Maya** é uma solução multicanal digital para o acompanhamento de tratamentos de **RPG**. A plataforma centraliza a comunicação e os dados clínicos em um ambiente seguro e organizado.

### ⚙️ Como o sistema é dividido:
* **🌐 Módulo Web:** Painel administrativo para gestão de prontuários e exercícios.
* **📱 Módulo Mobile:** Aplicativo para o paciente realizar check-ins e visualizar treinos.
* **🗄️ Backend:** Servidor centralizado que integra todas as informações.

---

## 📂 Estrutura de Pastas

```text
src/
└── Entrega 2/
    ├── backend/  # API Node.js + Banco MySQL (Docker)
    ├── web/      # Interface React (Vite)
    └── mobile/   # App Android Studio
🛠️ Tecnologias & FerramentasMóduloTecnologias PrincipaisBackendNode.js, Express, MySQL 8.0, DockerWebReact, Vite, Tailwind CSS, AxiosMobileJava/Kotlin, RetrofitDesignFigma, Postman, VS Code🚀 Como Executar o Projeto1. Iniciar o Backend (Obrigatório)O banco e a API rodam via Docker para evitar erros de configuração:Bashcd "src/Entrega 2/backend"
docker compose up --build
2. Iniciar o WebBashcd "src/Entrega 2/web"
npm install
npm run dev
3. Iniciar o MobileAbra a pasta src/Entrega 2/mobile no Android Studio e execute o emulador apontando para a API local.
