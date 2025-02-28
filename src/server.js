// src/server.js
const express = require('express');
const videoRoutes = require('./routes/videoRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const port = 3000;

app.use(express.json());


app.use('/', videoRoutes);

app.use('/', adminRoutes);


app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});