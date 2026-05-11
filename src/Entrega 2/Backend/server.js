const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise'); // 🚀 Certifique-se de ter essa linha!
require('dotenv').config();

// 🐳 Configuração preparada para Docker e Local
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '@FECAP@ALMA@01',
    database: process.env.DB_NAME || 'clinica_maya',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const app = express();

// Permite que o nosso React (Front-end) converse com o Node (Back-end)
app.use(cors());
app.use(express.json());

// 🔐 Rota de LOGIN (Verificando no MySQL)
app.post('/api/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Busca o usuário no banco de dados
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);

        // Se não achou nenhum usuário com esse email
        if (rows.length === 0) {
            return res.status(401).json({ erro: 'Usuário não encontrado!' });
        }

        const usuario = rows[0];

        // Verifica a senha (no futuro usaremos criptografia aqui!)
        if (senha === usuario.senha) {
            // Deu certo! Retornamos os dados (escondendo a senha por segurança)
            res.json({
                sucesso: true,
                mensagem: 'Login realizado com sucesso!',
                usuario: { id: usuario.id, nome: usuario.nome, cargo: usuario.cargo }
            });
        } else {
            // Email existe, mas senha está errada
            res.status(401).json({ erro: 'Senha incorreta!' });
        }

    } catch (error) {
        console.error('Erro na rota de login:', error);
        res.status(500).json({ erro: 'Erro interno no servidor' });
    }
});
// ==========================================
// 📋 ROTAS DE PACIENTES
// ==========================================

// 1. Rota para BUSCAR todos os pacientes (GET)
app.get('/api/pacientes', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM pacientes ORDER BY id DESC');
        res.json(rows); // Envia a lista para o React
    } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
        res.status(500).json({ erro: 'Erro interno ao buscar pacientes' });
    }
});

// 2. Rota para CADASTRAR um novo paciente (POST)
app.post('/api/pacientes', async (req, res) => {
    const { nome_completo, cpf, telefone, data_nascimento, profissao } = req.body;
    
    try {
        const [result] = await pool.query(
            'INSERT INTO pacientes (nome_completo, cpf, telefone, data_nascimento, profissao) VALUES (?, ?, ?, ?, ?)',
            [nome_completo, cpf, telefone, data_nascimento, profissao]
        );
        res.status(201).json({ 
            sucesso: true, 
            mensagem: 'Paciente cadastrado com sucesso!',
            id: result.insertId 
        });
    } catch (error) {
        console.error('Erro ao cadastrar paciente:', error);
        // Tratamento simples para CPF duplicado
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ erro: 'Este CPF já está cadastrado.' });
        }
        res.status(500).json({ erro: 'Erro interno ao cadastrar paciente' });
    }
});

// 3. Rota para ATUALIZAR um paciente (PUT)
app.put('/api/pacientes/:id', async (req, res) => {
    const { id } = req.params;
    const { nome_completo, cpf, telefone, data_nascimento, profissao } = req.body;
    
    try {
        await pool.query(
            'UPDATE pacientes SET nome_completo = ?, cpf = ?, telefone = ?, data_nascimento = ?, profissao = ? WHERE id = ?',
            [nome_completo, cpf, telefone, data_nascimento, profissao, id]
        );
        res.json({ sucesso: true, mensagem: 'Paciente atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar paciente:', error);
        res.status(500).json({ erro: 'Erro interno ao atualizar paciente' });
    }
});

// 4. Rota para ELIMINAR um paciente (DELETE)
app.delete('/api/pacientes/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        await pool.query('DELETE FROM pacientes WHERE id = ?', [id]);
        res.json({ sucesso: true, mensagem: 'Paciente removido com sucesso!' });
    } catch (error) {
        console.error('Erro ao eliminar paciente:', error);
        res.status(500).json({ erro: 'Erro interno ao eliminar paciente' });
    }
});

// ==========================================
// 🩺 ROTAS DE PRONTUÁRIOS (MAPA DE DOR)
// ==========================================

// Rota para SALVAR um novo prontuário (POST)
app.post('/api/prontuarios', async (req, res) => {
    const { paciente_id, data_avaliacao, queixa_principal, historico_molestia, mapa_dor_json, anotacoes_palpacao, objetivos_clinicos } = req.body;
    
    try {
        const [result] = await pool.query(
            'INSERT INTO prontuarios (paciente_id, data_avaliacao, queixa_principal, historico_molestia, mapa_dor_json, anotacoes_palpacao, objetivos_clinicos) VALUES (?, ?, ?, ?, ?, ?, ?)',
            // Transforma o array de dores (ex: ['cabeca', 'braco']) em uma string JSON para o MySQL aceitar
            [paciente_id, data_avaliacao, queixa_principal, historico_molestia, JSON.stringify(mapa_dor_json), anotacoes_palpacao, objetivos_clinicos]
        );
        res.status(201).json({ sucesso: true, mensagem: 'Prontuário salvo com sucesso!', id: result.insertId });
    } catch (error) {
        console.error('Erro ao salvar prontuário:', error);
        res.status(500).json({ erro: 'Erro interno ao salvar prontuário' });
    }
});

// Rota para BUSCAR o histórico de prontuários de um paciente específico (GET)
app.get('/api/prontuarios/:paciente_id', async (req, res) => {
    const { paciente_id } = req.params;
    
    try {
        // Busca os registros ordenados do mais recente para o mais antigo
        const [rows] = await pool.query(
            'SELECT * FROM prontuarios WHERE paciente_id = ? ORDER BY data_avaliacao DESC',
            [paciente_id]
        );
        res.json(rows);
    } catch (error) {
        console.error('Erro ao buscar histórico:', error);
        res.status(500).json({ erro: 'Erro interno ao buscar histórico' });
    }
});

app.delete('/api/prontuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM prontuarios WHERE id = ?', [id]);
        res.json({ sucesso: true, mensagem: 'Evolução removida!' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao remover evolução' });
    }
});

// ==========================================
// 📅 ROTAS DE AGENDAMENTO
// ==========================================

// 1. Criar novo agendamento (POST)
app.post('/api/agendamentos', async (req, res) => {
  const { paciente_id, data_agendamento, hora_agendamento, observacoes } = req.body;
  try {
    await pool.query(
      'INSERT INTO agendamentos (paciente_id, data_agendamento, hora_agendamento, observacoes) VALUES (?, ?, ?, ?)',
      [paciente_id, data_agendamento, hora_agendamento, observacoes]
    );
    res.status(201).json({ sucesso: true, mensagem: 'Agendamento realizado!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao agendar.' });
  }
});

// 2. Listar agendamentos com nomes (GET)
app.get('/api/agendamentos', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT a.*, p.nome_completo, p.telefone 
      FROM agendamentos a 
      JOIN pacientes p ON a.paciente_id = p.id 
      ORDER BY a.hora_agendamento ASC
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao carregar agenda.' });
  }
});

// ==========================================
// 📊 ROTAS DE ESTATÍSTICAS (DASHBOARD)
// ==========================================

app.get('/api/stats/resumo', async (req, res) => {
    try {
        const [[{ total_pacientes }]] = await pool.query('SELECT COUNT(*) as total_pacientes FROM pacientes');
        const [[{ total_agendamentos }]] = await pool.query('SELECT COUNT(*) as total_agendamentos FROM agendamentos');
        const [[{ total_prontuarios }]] = await pool.query('SELECT COUNT(*) as total_prontuarios FROM prontuarios');
        
        res.json({ total_pacientes, total_agendamentos, total_prontuarios });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar resumo' });
    }
});

app.get('/api/stats/mapa-dor', async (req, res) => {
    try {
        // Busca todos os mapas de dor salvos
        const [rows] = await pool.query('SELECT mapa_dor_json FROM prontuarios');
        
        const contagem = {};
        rows.forEach(row => {
            const dores = JSON.parse(row.mapa_dor_json || '[]');
            dores.forEach(dor => {
                contagem[dor] = (contagem[dor] || 0) + 1;
            });
        });

        // Transforma o objeto de contagem no formato que o Recharts entende
        const dataChart = Object.keys(contagem).map(key => ({
            name: key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '),
            value: contagem[key]
        })).sort((a, b) => b.value - a.value).slice(0, 5); // Pega o Top 5

        res.json(dataChart);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao processar mapa de dor' });
    }
});

// ==========================================
// 🏋️ ROTAS DE EXERCÍCIOS
// ==========================================

// 1. Cadastrar exercício
app.post('/api/exercicios', async (req, res) => {
    const { nome, categoria, descricao, url_midia } = req.body;
    try {
        await pool.query(
            'INSERT INTO exercicios (nome, categoria, descricao, url_midia) VALUES (?, ?, ?, ?)',
            [nome, categoria, descricao, url_midia]
        );
        res.status(201).json({ sucesso: true });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao salvar exercício' });
    }
});

// 2. Listar exercícios
app.get('/api/exercicios', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM exercicios ORDER BY categoria ASC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar exercícios' });
    }
});

// 3. Editar exercício (PUT)
app.post('/api/exercicios/:id', async (req, res) => { // Usando POST para simular PUT se preferir, ou app.put
    const { id } = req.params;
    const { nome, categoria, descricao, url_midia } = req.body;
    try {
        await pool.query(
            'UPDATE exercicios SET nome = ?, categoria = ?, descricao = ?, url_midia = ? WHERE id = ?',
            [nome, categoria, descricao, url_midia, id]
        );
        res.json({ sucesso: true, mensagem: 'Exercício atualizado!' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar exercício' });
    }
});

// 4. Deletar exercício (DELETE)
app.delete('/api/exercicios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM exercicios WHERE id = ?', [id]);
        res.json({ sucesso: true, mensagem: 'Exercício removido com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao remover exercício' });
    }
});

// ==========================================
// 📝 ROTA DE PRESCRIÇÃO
// ==========================================

app.post('/api/prescricoes', async (req, res) => {
    const { paciente_id, data_prescricao, orientacoes_gerais, itens } = req.body;
    
    try {
        // 1. Cria a prescrição principal
        const [result] = await pool.query(
            'INSERT INTO prescricoes (paciente_id, data_prescricao, orientacoes_gerais) VALUES (?, ?, ?)',
            [paciente_id, data_prescricao, orientacoes_gerais]
        );
        
        const prescricaoId = result.insertId;

        // 2. Cria os itens (exercícios) vinculados a essa prescrição
        const promises = itens.map(item => {
            return pool.query(
                'INSERT INTO prescricao_itens (prescricao_id, exercicio_id, series, repeticoes, observacoes_especificas) VALUES (?, ?, ?, ?, ?)',
                [prescricaoId, item.exercicio_id, item.series, item.repeticoes, item.observacoes_especificas]
            );
        });

        await Promise.all(promises);
        res.status(201).json({ sucesso: true, id: prescricaoId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao salvar prescrição' });
    }
});

// ==========================================
// 📄 ROTA DE RELATÓRIO COMPLETO
// ==========================================

app.get('/api/pacientes/:id/relatorio', async (req, res) => {
    const { id } = req.params;
    try {
        // 1. Dados do Paciente
        const [[paciente]] = await pool.query('SELECT * FROM pacientes WHERE id = ?', [id]);
        
        // 2. Todos os Prontuários (Evolução)
        const [prontuarios] = await pool.query(
            'SELECT * FROM prontuarios WHERE paciente_id = ? ORDER BY data_avaliacao DESC', 
            [id]
        );

        // 3. Última Prescrição
        const [prescricoes] = await pool.query(
            'SELECT * FROM prescricoes WHERE paciente_id = ? ORDER BY data_prescricao DESC LIMIT 1',
            [id]
        );

        res.json({ paciente, prontuarios, ultima_prescricao: prescricoes[0] || null });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao gerar dados do relatório' });
    }
});

// ==========================================
// 💰 ROTAS FINANCEIRAS
// ==========================================

// 1. Lançar nova sessão no financeiro
app.post('/api/financeiro', async (req, res) => {
    const { paciente_id, valor, data_sessao, status, metodo_pagamento, observacao } = req.body;
    try {
        await pool.query(
            'INSERT INTO financeiro (paciente_id, valor, data_sessao, status, metodo_pagamento, observacao) VALUES (?, ?, ?, ?, ?, ?)',
            [paciente_id, valor, data_sessao, status, metodo_pagamento, observacao]
        );
        res.status(201).json({ sucesso: true });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao lançar financeiro' });
    }
});

// 2. Buscar resumo financeiro (Entradas do mês)
app.get('/api/financeiro/resumo', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                f.*, p.nome_completo as paciente_nome 
            FROM financeiro f 
            JOIN pacientes p ON f.paciente_id = p.id 
            ORDER BY data_sessao DESC
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar resumo financeiro' });
    }
});

// 3. Alternar status de pagamento (Pago/Pendente)
app.patch('/api/financeiro/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await pool.query('UPDATE financeiro SET status = ? WHERE id = ?', [status, id]);
        res.json({ sucesso: true });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar status' });
    }
});

// Define a porta do servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor Backend rodando na porta ${PORT}`);
});