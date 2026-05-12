const db = require('../config/db');

class UsuarioModel {
    static async listarTodos() {
        // Exemplo simples de query. Aqui entra o seu conhecimento de SQL!
        const [linhas] = await db.execute('SELECT id, nome, email, perfil FROM Usuarios WHERE status = "ATIVO"');
        return linhas;
    }
}

module.exports = UsuarioModel;