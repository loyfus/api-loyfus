// index.js (Conteúdo movido de src/server.js)
const express = require('express');
const videoRoutes = require('./src/routes/videoRoutes'); // Ajuste o caminho para as rotas
const adminRoutes = require('./src/routes/adminRoutes'); // Ajuste o caminho para as rotas
const path = require('path'); // Importe o módulo 'path'

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', videoRoutes);

app.use('/', adminRoutes);


app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});