const Video = require('../models/videoModel');

const videoController = {
    listarVideos: (req, res) => {
        Video.listarTodos((err, rows) => {
            if (err) {
                console.error("Erro ao listar vídeos: " + err.message);
                return res.status(500).json({ error: "Erro ao listar vídeos" });
            }
            res.json(rows);
        });
    },

    detalharVideo: (req, res) => {
        const videoId = req.params.id;
        Video.buscarPorId(videoId, (err, row) => {
            if (err) {
                console.error("Erro ao detalhar vídeo: " + err.message);
                return res.status(500).json({ error: "Erro ao detalhar vídeo" });
            }
            if (!row) {
                return res.status(404).json({ message: "Vídeo não encontrado" });
            }
            res.json(row);
        });
    }
};

module.exports = videoController;