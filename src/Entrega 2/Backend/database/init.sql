-- 1. Usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(100),
    cargo VARCHAR(50)
);

-- 2. Pacientes
CREATE TABLE IF NOT EXISTS pacientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(255),
    cpf VARCHAR(14) UNIQUE,
    telefone VARCHAR(20),
    data_nascimento DATE,
    profissao VARCHAR(100)
);

-- 3. Prontuários (Histórico e Mapa de Dor)
CREATE TABLE IF NOT EXISTS prontuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    queixa_principal TEXT,
    historico_molestia TEXT,
    mapa_dor_json TEXT, -- Onde salvamos as coordenadas da dor
    anotacoes_palpacao TEXT,
    objetivos_clinicos TEXT,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
);

-- 4. Agenda
CREATE TABLE IF NOT EXISTS agendamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    data_agendamento DATE NOT NULL,
    hora_agendamento TIME NOT NULL,
    observacoes TEXT,
    status ENUM('Confirmado', 'Cancelado', 'Realizado') DEFAULT 'Confirmado',
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
);

-- 5. Banco de Exercícios
CREATE TABLE IF NOT EXISTS exercicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    categoria VARCHAR(100),
    descricao TEXT,
    url_midia VARCHAR(255)
);

-- 6. Prescrições (Cabeçalho)
CREATE TABLE IF NOT EXISTS prescricoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    data_prescricao DATE NOT NULL,
    orientacoes_gerais TEXT,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
);

-- 7. Itens da Prescrição (Relação com Exercícios)
CREATE TABLE IF NOT EXISTS prescricao_itens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prescricao_id INT NOT NULL,
    exercicio_id INT NOT NULL,
    series VARCHAR(50),
    repeticoes VARCHAR(50),
    observacoes_especificas TEXT,
    FOREIGN KEY (prescricao_id) REFERENCES prescricoes(id) ON DELETE CASCADE,
    FOREIGN KEY (exercicio_id) REFERENCES exercicios(id) ON DELETE CASCADE
);

-- 8. Financeiro (Fluxo de Caixa)
CREATE TABLE IF NOT EXISTS financeiro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    data_sessao DATE NOT NULL,
    status ENUM('Pago', 'Pendente') DEFAULT 'Pendente',
    metodo_pagamento VARCHAR(50),
    observacao TEXT,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
);

-- Dados Iniciais para Teste
INSERT INTO usuarios (nome, email, senha, cargo) 
VALUES ('Administrador', 'admin@maya.com', '123456', 'Fisioterapeuta')
ON DUPLICATE KEY UPDATE email=email;