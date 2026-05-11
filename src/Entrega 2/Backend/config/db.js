const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection()
    .then(() => console.log('✅ Banco de Dados conectado com sucesso! (Clínica Maya)'))
    .catch((err) => console.error('❌ Erro ao conectar no Banco:', err));

module.exports = pool;