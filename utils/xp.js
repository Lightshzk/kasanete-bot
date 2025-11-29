const db = require('./database');

/**
 * Sistema de XP Melhorado
 * Gerencia pontos de experiência e nivelamento com validações
 */

class XPSystem {
    /**
     * Calcula XP necessário para um nível
     */
    static getXPForLevel(level) {
        // Formula: 100 * level^1.5 para progressão mais realista
        return Math.floor(100 * Math.pow(level, 1.5));
    }

    /**
     * Calcula nível baseado no XP total
     */
    static calculateLevel(totalXP) {
        let level = 1;
        let xpAccumulated = 0;

        while (xpAccumulated + this.getXPForLevel(level) <= totalXP) {
            xpAccumulated += this.getXPForLevel(level);
            level++;
        }

        return { level, xpAccumulated };
    }

    /**
     * Adiciona XP e verifica level up
     */
    static async addXP(userId, username, xpAmount) {
        try {
            // Validar entrada
            if (!userId || !username) {
                throw new Error('userId e username são obrigatórios');
            }

            if (!Number.isInteger(xpAmount) || xpAmount < 0) {
                throw new Error('xpAmount deve ser um número positivo');
            }

            // Criar usuário se não existir
            await db.createOrUpdateUser(userId, username);

            // Pegar dados atuais
            let user = await db.getUser(userId);
            
            if (!user) {
                user = { id: userId, username, level: 1, xp: 0, vip: 0 };
            }

            const oldLevel = user.level;
            const oldXP = user.xp || 0;

            // Adicionar XP
            await db.addXP(userId, xpAmount);

            // Pegar XP atualizado
            user = await db.getUser(userId);
            const newXP = user.xp || 0;
            
            // Calcular novo nível
            const { level: newLevel, xpAccumulated } = this.calculateLevel(newXP);

            // Se subiu de nível, atualiza database
            if (newLevel > oldLevel) {
                await db.updateLevel(userId, newLevel);
            }

            const xpNeeded = this.getXPForLevel(newLevel);
            const progressoXP = newXP - xpAccumulated;

            return {
                levelUp: newLevel > oldLevel,
                oldLevel,
                level: newLevel,
                xpGain: xpAmount,
                totalXP: newXP,
                xpProgress: progressoXP,
                xpNeeded,
                percentProgress: Math.round((progressoXP / xpNeeded) * 100)
            };

        } catch (error) {
            console.error('❌ Erro ao adicionar XP:', error);
            return {
                levelUp: false,
                level: 1,
                xpGain: 0,
                totalXP: 0,
                xpProgress: 0,
                xpNeeded: this.getXPForLevel(1),
                percentProgress: 0,
                error: error.message
            };
        }
    }

    /**
     * Obtém top 10 usuários por nível/XP
     */
    static async getLeaderboard(limit = 10) {
        try {
            const leaderboard = await db.getTopUsers(limit);
            
            if (!Array.isArray(leaderboard)) {
                return [];
            }

            return leaderboard.map((user, index) => ({
                position: index + 1,
                username: user.username,
                level: user.level,
                xp: user.xp || 0,
                vip: user.vip ? '✅' : '❌'
            }));
        } catch (error) {
            console.error('❌ Erro ao obter leaderboard:', error);
            return [];
        }
    }

    /**
     * Obtém informações de XP do usuário
     */
    static async getUserXPInfo(userId) {
        try {
            const user = await db.getUser(userId);
            
            if (!user) {
                return null;
            }

            const { level, xpAccumulated } = this.calculateLevel(user.xp || 0);
            const xpNeeded = this.getXPForLevel(level);
            const progressoXP = (user.xp || 0) - xpAccumulated;

            return {
                username: user.username,
                level,
                totalXP: user.xp || 0,
                xpProgress: progressoXP,
                xpNeeded,
                percentProgress: Math.round((progressoXP / xpNeeded) * 100),
                vip: user.vip ? 'Sim ✅' : 'Não ❌',
                joinDate: user.created_at || 'Desconhecido'
            };
        } catch (error) {
            console.error('❌ Erro ao obter info de XP:', error);
            return null;
        }
    }
}

// Compatibilidade com código antigo
const addXP = async (userId, username, xpAmount) => {
    return XPSystem.addXP(userId, username, xpAmount);
};

const getXPForLevel = (level) => {
    return XPSystem.getXPForLevel(level);
};

module.exports = XPSystem;
module.exports.addXP = addXP;
module.exports.getXPForLevel = getXPForLevel;