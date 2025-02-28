// src/controllers/adminController.js
const Video = require('../models/videoModel'); // Importe o Video Model

const adminController = {
    criarVideo: (req, res) => {
        const videoData = req.body; // Pega os dados do vídeo do corpo da requisição

        if (!videoData.titulo) {
            return res.status(400).json({ error: "O título é obrigatório." });
        }

        Video.criar(videoData, (err, videoId) => { // Usa Video.criar() do model
            if (err) {
                console.error("Erro ao criar vídeo: " + err.message);
                return res.status(500).json({ error: "Erro ao criar vídeo" });
            }
            res.status(201).json({ id: videoId, message: "Vídeo criado com sucesso!" });
        });
    },

    editarVideo: (req, res) => {
        const videoId = req.params.id;
        const videoData = req.body; // Pega os dados do vídeo do corpo da requisição

        if (!videoData.titulo) {
            return res.status(400).json({ error: "O título é obrigatório." });
        }

        Video.atualizar(videoId, videoData, (err, changes) => {
            if (err) {
                console.error("Erro ao editar vídeo: " + err.message);
                return res.status(500).json({ error: "Erro ao editar vídeo" });
            }
            if (changes === 0) {
                return res.status(404).json({ message: "Vídeo não encontrado para edição." });
            }
            res.json({ message: "Vídeo editado com sucesso!" });
        });
    },

    excluirVideo: (req, res) => {
        const videoId = req.params.id;
        Video.excluir(videoId, (err, changes) => {
            if (err) {
                console.error("Erro ao excluir vídeo: " + err.message);
                return res.status(500).json({ error: "Erro ao excluir vídeo" });
            }
            if (changes === 0) {
                return res.status(404).json({ message: "Vídeo não encontrado para exclusão." });
            }
            res.json({ message: "Vídeo excluído com sucesso!" });
        });
    }
};

module.exports = adminController;