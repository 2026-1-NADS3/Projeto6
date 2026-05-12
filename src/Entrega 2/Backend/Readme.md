# 🗄️ Clínica Maya — Backend Engine & Database

> **O núcleo de processamento e persistência de dados para o ecossistema de Reeducação Postural Global (RPG).**
> Este módulo gerencia as regras de negócio, a segurança via autenticação e a integração direta com o banco de dados MySQL via Docker.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

---

## 📖 Sobre o Módulo
O Backend da Clínica Maya foi projetado para ser **agnóstico de plataforma**, servindo simultaneamente o Painel Web (React) e o App Mobile (Android Studio). Através de uma arquitetura REST, ele garante a integridade dos prontuários e a segurança das informações sensíveis dos pacientes.

---

## 🛠️ Stack de Tecnologias

| Categoria | Tecnologia | Função |
| :--- | :--- | :--- |
| **Runtime** | Node.js v18+ | Ambiente de execução JavaScript no lado do servidor |
| **Framework** | Express.js | Framework minimalista para criação de rotas e APIs |
| **Banco de Dados** | MySQL 8.0 | Armazenamento relacional de alta performance |
| **Containerização** | Docker | Padronização e isolamento do ambiente de dev/ops |
| **Comunicação** | CORS & JSON | Protocolos de troca de dados entre Web/Mobile |

---

## 🔗 Catálogo de Endpoints (API REST)

| Método | Rota | Descrição | Resposta (Exemplo) |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/login` | Autenticação do profissional/admin | `{ "auth": true, "token": "..." }` |
| `GET` | `/api/pacientes` | Lista completa de pacientes | `[ { "id": 1, "nome": "..." }, ... ]` |
| `POST` | `/api/pacientes` | Cadastro de novo prontuário | `{ "message": "Paciente Criado" }` |
| `GET` | `/api/exercicios` | Biblioteca de movimentos (RPG) | `[ { "id": 10, "nome": "..." }, ... ]` |
| `GET` | `/api/financeiro` | Resumo de sessões e pagamentos | `{ "total": 1500.00, "data": [] }` |

---

## 📂 Estrutura de Pastas

```text
backend/
├── 📁 config/        # Conexão com o Banco e Variáveis de Ambiente
├── 📁 controllers/   # Lógica de negócio e tratamento de requisições
├── 📁 database/      # Scripts SQL (init.sql) e Migrations
├── 📁 models/        # Esquemas de dados e Consultas SQL
├── 📁 routes/        # Definição das rotas consumidas pelo Web/Mobile
├── Dockerfile        # Instruções de build da imagem Node.js
└── docker-compose.yml # Orquestrador da API + Banco de Dados
