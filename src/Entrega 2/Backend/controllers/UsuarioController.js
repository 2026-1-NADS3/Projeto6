const UsuarioModel = require('../models/UsuarioModel');

class UsuarioController {
    static async getUsuarios(req, res) {
        try {
            const usuarios = await UsuarioModel.listarTodos();
            res.status(200).json(usuarios);
        } catch (erro) {
            console.error("Erro ao buscar usuários:", erro);
            res.status(500).json({ mensagem: "Erro interno no servidor." });
        }
    }
}

module.exports = UsuarioController;