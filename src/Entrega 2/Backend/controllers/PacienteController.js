const PacienteModel = require('../models/PacienteModel');

class PacienteController {
    static async getPacientes(req, res) {
        try {
            const pacientes = await PacienteModel.listarTodos();
            res.status(200).json(pacientes);
        } catch (erro) {
            console.error("Erro ao buscar pacientes:", erro);
            res.status(500).json({ mensagem: "Erro interno no servidor." });
        }
    }
}

module.exports = PacienteController;