// src/models/videoModel.js
const db = require('../database/db');

const Video = {
    listarTodos: (callback) => {
        db.all("SELECT id, titulo, thumbnail FROM videos", [], callback);
    },

    buscarPorId: (id, callback) => {
        db.get("SELECT * FROM videos WHERE id = ?", [id], callback);
    },

    criar: (videoData, callback) => {
        const { titulo, descricao, thumbnail, links } = videoData;
        db.run(
            "INSERT INTO videos (titulo, descricao, thumbnail, links) VALUES (?, ?, ?, ?)",
            [titulo, descricao, thumbnail, links],
            function (err) { // Usando function para acessar 'this.lastID'
                callback(err, this.lastID); // Retorna o erro e o ID do vídeo criado
            }
        );
    },

    atualizar: (id, videoData, callback) => {
        const { titulo, descricao, thumbnail, links } = videoData;
        db.run(
            "UPDATE videos SET titulo = ?, descricao = ?, thumbnail = ?, links = ? WHERE id = ?",
            [titulo, descricao, thumbnail, links, id],
            function (err) {
                callback(err, this.changes); // Retorna o erro e o número de linhas alteradas
            }
        );
    },

    excluir: (id, callback) => {
        db.run("DELETE FROM videos WHERE id = ?", [id], function (err) {
            callback(err, this.changes); // Retorna o erro e o número de linhas deletadas
        });
    }
};

module.exports = Video;