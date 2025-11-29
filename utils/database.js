const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Criar pasta data se não existir
const fs = require('fs');
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Conectar ao banco de dados
const dbPath = path.join(dataDir, 'kasane.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('✅ Banco de dados SQLite carregado!');
    }
});

// Criar tabelas
db.serialize(() => {
    // Tabela de usuários
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT,
        level INTEGER DEFAULT 1,
        xp INTEGER DEFAULT 0,
        vip INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    console.log('✅ Tabelas criadas/verificadas!');
});

// Funções do banco de dados
module.exports = {
    // Obter usuário
    getUser: (userId) => {
        return new Promise((resolve, reject) => {
            db.get(
                `SELECT * FROM users WHERE id = ?`,
                [userId],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });
    },

    // Criar ou atualizar usuário
    createOrUpdateUser: (userId, username) => {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO users (id, username) 
                 VALUES (?, ?) 
                 ON CONFLICT(id) DO UPDATE SET username = ?`,
                [userId, username, username],
                function(err) {
                    if (err) reject(err);
                    else resolve({ id: userId, changes: this.changes });
                }
            );
        });
    },

    // Adicionar XP
    addXP: (userId, xpAmount) => {
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE users SET xp = xp + ? WHERE id = ?`,
                [xpAmount, userId],
                function(err) {
                    if (err) reject(err);
                    else resolve({ changes: this.changes });
                }
            );
        });
    },

    // Atualizar nível
    updateLevel: (userId, newLevel) => {
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE users SET level = ?, xp = 0 WHERE id = ?`,
                [newLevel, userId],
                function(err) {
                    if (err) reject(err);
                    else resolve({ changes: this.changes });
                }
            );
        });
    },

    // Definir VIP
    setVIP: (userId, isVip) => {
        return new Promise((resolve, reject) => {
            const vipValue = isVip ? 1 : 0;
            
            db.run(
                `UPDATE users SET vip = ? WHERE id = ?`,
                [vipValue, userId],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        console.log(`✅ VIP ${isVip ? 'ativado' : 'desativado'} para: ${userId}`);
                        resolve({ changes: this.changes });
                    }
                }
            );
        });
    },

    // Verificar se é VIP
    isVIP: (userId) => {
        return new Promise((resolve, reject) => {
            db.get(
                `SELECT vip FROM users WHERE id = ?`,
                [userId],
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row?.vip === 1 || false);
                    }
                }
            );
        });
    },

    // Listar todos os VIPs
    listVIPs: () => {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT id, username, level FROM users WHERE vip = 1`,
                [],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows || []);
                }
            );
        });
    },

    // Obter ranking (top 10)
    getRanking: (limit = 10) => {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT username, level, xp FROM users 
                 ORDER BY level DESC, xp DESC 
                 LIMIT ?`,
                [limit],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows || []);
                }
            );
        });
    },

    // Fechar conexão (usar ao desligar o bot)
    close: () => {
        return new Promise((resolve, reject) => {
            db.close((err) => {
                if (err) reject(err);
                else {
                    console.log('✅ Banco de dados fechado.');
                    resolve();
                }
            });
        });
    }
};