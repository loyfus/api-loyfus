// src/models/userModel.js
const db = require('../database/db');
const bcrypt = require('bcrypt');

const User = {
    buscarPorUsername: (username, callback) => {
        db.get("SELECT * FROM users WHERE username = ?", [username], callback);
    },

    criar: (userData, callback) => {
        const { username, password } = userData;

        bcrypt.hash(password, 10, (err, hashedPassword) => { // 10 é o "salt rounds"
            if (err) {
                return callback(err, null); // Retorna erro se falhar o hash
            }

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
        bcrypt.compare(passwordDigitada, passwordHashDoBanco, callback);
    }

};

module.exports = User;