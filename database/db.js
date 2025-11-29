const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'teto.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) return console.error("❌ Erro ao abrir DB:", err);
    console.log("✅ Banco de dados SQLite carregado!");
});

// Criar tabela se não existir
db.run(`
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    coins INTEGER DEFAULT 0
);
`);

module.exports = db;
