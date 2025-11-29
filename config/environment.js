const dotenv = require('dotenv');
const path = require('path');

// Carregar variáveis de ambiente
dotenv.config({
    path: path.join(__dirname, '../.env')
});

/**
 * Configurações centralizadas do bot
 * Todas as configurações são carregadas a partir de variáveis de ambiente
 */

const config = {
    // Prefixo e Comandos
    prefix: process.env.COMMAND_PREFIX || '!',
    
    // Informações do Dono
    owner: {
        name: process.env.OWNER_NAME || 'Lightshzk',
        number: process.env.OWNER_NUMBER || '',
    },
    
    // Sistema de XP
    xp: {
        perMessage: parseInt(process.env.XP_PER_MESSAGE) || 8,
        perCommand: parseInt(process.env.XP_PER_COMMAND) || 15,
        levelMultiplier: parseInt(process.env.LEVEL_MULTIPLIER) || 100,
    },
    
    // Rate Limiting (proteção contra spam)
    rateLimiting: {
        maxMessages: parseInt(process.env.RATE_LIMIT_MESSAGES) || 10,
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) || 60000, // 1 minuto
    },
    
    // Limites Gerais
    limits: {
        maxMessageLength: parseInt(process.env.MAX_MESSAGE_LENGTH) || 500,
        maxPlayResults: parseInt(process.env.MAX_PLAY_RESULTS) || 5,
        playTimeout: parseInt(process.env.PLAY_TIMEOUT) || 60000,
    },
    
    // Links Importantes
    links: {
        grupoOficial: process.env.GRUPO_OFICIAL || '',
        repositorio: process.env.REPOSITORIO || 'https://github.com/Lightshzk/kasane-bot',
    },
    
    // Debug e Logs
    debug: {
        enabled: process.env.DEBUG_MODE === 'true',
        logLevel: process.env.LOG_LEVEL || 'info',
    },
    
    // APIs (deixar vazio se não usar)
    apis: {
        imgur: process.env.IMGUR_API_KEY || '',
        youtube: process.env.YOUTUBE_API_KEY || '',
    },
};

module.exports = config;
