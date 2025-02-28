// index.js (Conteúdo movido de src/server.js)
const cors = require('cors');
const express = require('express');
const videoRoutes = require('./src/routes/videoRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', videoRoutes);

app.use('/', adminRoutes);


app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});