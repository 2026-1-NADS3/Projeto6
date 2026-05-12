const express = require('express');
const router = express.Router();

router.get('/pacientes', (req, res) => {
    // Simulando os dados que futuramente virão do seu banco de dados MySQL
    const pacientesDoBanco = [
      { id: 1, nome: 'João Silva', idade: '45 anos', telefone: '(11) 98765-4321', email: 'joao.silva@email.com', diagnostico: 'Lombalgia Crônica', status: 'Ativo' },
      { id: 2, nome: 'Maria Oliveira', idade: '32 anos', telefone: '(11) 91234-5678', email: 'maria.ol@email.com', diagnostico: 'Pós-operatório LCA', status: 'Ativo' },
      { id: 3, nome: 'Carlos Ferreira', idade: '58 anos', telefone: '(11) 99876-5432', email: 'carlos.f@email.com', diagnostico: 'Bursite no Ombro', status: 'Inativo' },
      { id: 4, nome: 'Ana Souza', idade: '29 anos', telefone: '(11) 98888-7777', email: 'ana.souza@email.com', diagnostico: 'Tendinopatia Patelar', status: 'Ativo' }
    ];
    
    // O servidor responde enviando essa lista em formato JSON
    res.json(pacientesDoBanco);
});

module.exports = router;