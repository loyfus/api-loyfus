// src/routes/videoRoutes.js
const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

// Rota para listar todos os vídeos (página inicial)
router.get('/', videoController.listarVideos);

// Rota para detalhar um vídeo específico
router.get('/video/:id', videoController.detalharVideo);

module.exports = router;