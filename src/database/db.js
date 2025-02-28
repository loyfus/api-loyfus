// src/database/db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '..', '..', 'videos.db'); // Caminho para o banco de dados

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados: " + err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
        criarTabelaVideos();
        criarTabelaUsers();
    }
});

function criarTabelaVideos() {
    db.run(`
        CREATE TABLE IF NOT EXISTS videos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descricao TEXT,
            thumbnail TEXT,
            links TEXT
        )
    `, (err) => {
        if (err) {
            console.error("Erro ao criar tabela videos: " + err.message);
        } else {
            console.log("Tabela 'videos' criada ou já existente.");
        }
    });
}

function criarTabelaUsers() {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error("Erro ao criar tabela users: " + err.message);
        } else {
            console.log("Tabela 'users' criada ou já existente.");
        }
    });
}

module.exports = db;