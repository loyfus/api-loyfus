// src/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const secretKey = 'chaveSuperSecretaParaJWT';

function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Token JWT não fornecido.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token JWT mal formatado.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token JWT inválido.' });
        }
        req.adminId = decoded.id;
        next();
    });
}

router.post('/admin/login', (req, res) => {
    const { username, password } = req.body;

    User.buscarPorUsername(username, (err, user) => {
        if (err) {
            console.error("Erro ao buscar usuário:", err);
            return res.status(500).json({ message: 'Erro interno no servidor.' });
        }

        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        User.compararSenha(password, user.password, (err, senhasCorrespondem) => {
            if (err) {
                console.error("Erro ao comparar senhas:", err);
                return res.status(500).json({ message: 'Erro interno no servidor.' });
            }

            if (!senhasCorrespondem) {
                return res.status(401).json({ message: 'Credenciais inválidas.' });
            }

            const payload = {
                id: user.id,
                username: user.username
            };

            const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

            return res.json({ token: token, message: 'Login bem-sucedido!' });
        });
    });
});


router.post('/admin/videos', verifyJWT, adminController.criarVideo);
router.put('/admin/videos/:id', verifyJWT, adminController.editarVideo);
router.delete('/admin/videos/:id', verifyJWT, adminController.excluirVideo);


module.exports = router;