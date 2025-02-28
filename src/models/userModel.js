// src/models/userModel.js
const db = require('../database/db');
const bcrypt = require('bcrypt'); // Vamos usar bcrypt para hash de senhas

const User = {
    buscarPorUsername: (username, callback) => {
        db.get("SELECT * FROM users WHERE username = ?", [username], callback);
    },

    criar: (userData, callback) => {
        const { username, password } = userData;

        // 1. Hash da senha antes de salvar
        bcrypt.hash(password, 10, (err, hashedPassword) => { // 10 é o "salt rounds"
            if (err) {
                return callback(err, null); // Retorna erro se falhar o hash
            }

            // 2. Inserir o novo usuário no banco de dados com a senha hasheada
            db.run(
                "INSERT INTO users (username, password) VALUES (?, ?)",
                [username, hashedPassword],
                function (err) {
                    callback(err, this.lastID); // Retorna erro e o ID do usuário criado
                }
            );
        });
    },

    compararSenha: (passwordDigitada, passwordHashDoBanco, callback) => {
        bcrypt.compare(passwordDigitada, passwordHashDoBanco, callback); // bcrypt.compare(senha_digitada, senha_hash, function(err, res) { ... });
    }
    // ... você pode adicionar outras funções como atualizar informações do usuário, excluir usuário, etc.
};

module.exports = User;