const express = require('express');
const router = express.Router();

router.get('/usuarios', (req, res) => {
    res.json({ mensagem: "Rota de usuários OK!" });
});

module.exports = router;