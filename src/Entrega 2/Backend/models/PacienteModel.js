const db = require('../config/db');

class PacienteModel {
    static async listarTodos() {
        // Adaptando para buscar os dados que o seu Front-end precisa
        // Estamos unindo os dados da tabela de Usuários (nome, email) com a de Prontuários
        const query = `
            SELECT 
                p.id, 
                u.nome, 
                p.telefone, 
                u.email, 
                p.diagnostico_base AS diagnostico, 
                u.status
            FROM Pacientes_Prontuarios p
            JOIN Usuarios u ON p.usuario_id = u.id
            WHERE u.perfil = 'PACIENTE'
        `;
        const [linhas] = await db.execute(query);
        return linhas;
    }
}

module.exports = PacienteModel;