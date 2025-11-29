const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Importar sistemas melhorados
const Logger = require('./utils/logger');
const CommandManager = require('./utils/commandmanager');
const RateLimiter = require('./utils/ratelimiter');
const Validator = require('./utils/validator');
const XPSystem = require('./utils/xp');
const config = require('./config/environment');

// Inicializar logger
const logger = new Logger({
    logLevel: config.debug.enabled ? 'debug' : 'info'
});

// Inicializar sistemas
const rateLimiter = new RateLimiter({
    maxMessages: config.rateLimiting.maxMessages,
    windowMs: config.rateLimiting.windowMs
});

const commandManager = new CommandManager({
    prefix: config.prefix
});

// Hora de início
const startTime = new Date();

// Cliente WhatsApp
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// ========== REGISTRAR COMANDOS ==========

// Comando Menu
commandManager.register({
    name: 'menu',
    description: 'Mostrar este menu fofinho',
    category: 'Geral',
    aliases: ['ajuda', 'help'],
    cooldown: 5,
    execute: async (message) => {
        const { sendMenu } = require('./comandos/menu');
        const user = message._data?.notifyName || 'Usuário';
        const isVip = false;
        const cargo = '-';
        
        await sendMenu(message, client, user, isVip, cargo);
        return true;
    }
});

// Comando Ping
commandManager.register({
    name: 'ping',
    description: 'Ver tempo online e latência',
    category: 'Geral',
    aliases: ['latência', 'status'],
    cooldown: 3,
    execute: async (message) => {
        const { ping } = require('./comandos');
        await message.reply(ping(message, startTime));
        return true;
    }
});

// Comando Sobre
commandManager.register({
    name: 'sobre',
    description: 'Saber mais sobre Teto-Chan',
    category: 'Geral',
    aliases: ['info', 'about'],
    cooldown: 5,
    execute: async (message) => {
        const { sobre } = require('./comandos');
        await message.reply(sobre());
        return true;
    }
});

// Comando Foto
commandManager.register({
    name: 'foto',
    description: 'Receber uma foto fofa',
    category: 'Anime & Fun',
    cooldown: 10,
    execute: async (message) => {
        const { foto } = require('./comandos');
        await foto(message, client);
        return true;
    }
});

// Comando Boa Noite
commandManager.register({
    name: 'boanoite',
    description: 'Receber mensagem de boa noite',
    category: 'Geral',
    aliases: ['boanoite', 'boa noite', 'boa-noite'],
    cooldown: 15,
    execute: async (message) => {
        const { boanoite } = require('./comandos');
        await boanoite(message);
        return true;
    }
});

// Comando Anime Foto
commandManager.register({
    name: 'fotoanime',
    description: 'Foto de anime aleatória',
    category: 'Anime & Fun',
    aliases: ['anime'],
    cooldown: 5,
    execute: async (message) => {
        const { fotoanime } = require('./comandos');
        await fotoanime(message, client);
        return true;
    }
});

// Comando Neko
commandManager.register({
    name: 'neko',
    description: 'Foto fofa de neko',
    category: 'Anime & Fun',
    cooldown: 5,
    execute: async (message) => {
        const { neko } = require('./comandos/neko');
        await neko(message, client);
        return true;
    }
});

// Comando Kitsune
commandManager.register({
    name: 'kitsune',
    description: 'Foto de kitsune (raposa)',
    category: 'Anime & Fun',
    cooldown: 5,
    execute: async (message) => {
        const { kitsune } = require('./comandos/kitsune');
        await kitsune(message, client);
        return true;
    }
});

// Comando Grupo Oficial
commandManager.register({
    name: 'grupooficial',
    description: 'Link do grupo oficial',
    category: 'Social',
    aliases: ['grupo', 'link'],
    cooldown: 3,
    execute: async (message) => {
        const { grupooficial } = require('./comandos');
        await message.reply(grupooficial());
        return true;
    }
});

// Comando Perfil
commandManager.register({
    name: 'perfil',
    description: 'Ver seu perfil e nível',
    category: 'Usuário',
    aliases: ['profile', 'level'],
    cooldown: 5,
    execute: async (message) => {
        const { perfil } = require('./comandos/perfil');
        await perfil(message);
        return true;
    }
});

// ========== EVENTOS DO CLIENTE ==========

// Evento: QR Code
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    logger.connection('QR_CODE_GERADO', 'Escaneie o código para conectar');
});

// Evento: Cliente Pronto
client.on('ready', () => {
    logger.connection('CONECTADO', `Kasane Teto está online! Iniciada em ${startTime.toLocaleString('pt-BR')}`);
    console.log('🎀 Kasane Teto está online e pronta para cantar!');
});

// Evento: Mensagem Recebida
client.on('message', async (message) => {
    try {
        const msgText = message.body.toLowerCase().trim();
        const userId = message.from;
        const userName = message._data?.notifyName || 'Anônimo';

        // Ignorar mensagens do próprio bot
        if (message.fromMe) return;

        // Ignorar mensagens vazias
        if (Validator.isEmpty(msgText)) return;

        logger.info(`Mensagem recebida de ${userName}: ${msgText}`);

        // ========== RATE LIMITING ==========
        const limitCheck = rateLimiter.checkUserLimit(userId);
        
        if (!limitCheck.allowed) {
            const warnings = rateLimiter.addSpamWarning(userId);
            logger.warn(`Rate limit excedido para ${userName}`, { warnings, resetIn: limitCheck.resetIn });
            
            if (warnings === 1) {
                await message.reply(`⚠️ Você está enviando mensagens muito rápido! Aguarde ${limitCheck.resetIn}s.`);
            }
            return;
        }

        // ========== SISTEMA DE XP ==========
        const xpResult = await XPSystem.addXP(userId, userName, config.xp.perMessage);
        
        if (xpResult.levelUp && !xpResult.error) {
            logger.xp(userId, userName, xpResult.xpGain, xpResult.level);
            await message.reply(`🎤✨ *PARABÉNS!*\n\n${userName} subiu de nível!\n📈 Novo nível: *${xpResult.level}*\n🌟 Continue brilhando como Teto~♪`);
        }

        // ========== PROCESSAMENTO DE COMANDOS ==========
        if (msgText.startsWith(config.prefix)) {
            const parts = msgText.slice(config.prefix.length).split(/\s+/);
            const commandName = parts[0];
            const args = parts.slice(1);

            logger.command(userId, userName, commandName, args);

            // Verificar Rate Limit de Comando
            const cmdLimitCheck = rateLimiter.checkCommandLimit(userId, commandName, 5);
            if (!cmdLimitCheck.allowed) {
                await message.reply(`⏱️ Aguarde ${cmdLimitCheck.resetIn}s antes de usar *${commandName}* novamente.`);
                return;
            }

            // Executar comando
            const result = await commandManager.execute(commandName, message, args, {
                ownerId: config.owner.number,
                isAdmin: false // Implementar lógica de admin se necessário
            });

            if (!result.success) {
                logger.warn(`Erro ao executar comando: ${commandName}`, result.error);
                await message.reply(result.error);
            } else {
                logger.info(`✅ Comando executado: ${commandName}`);
            }
        }

        // ========== RESPOSTAS AUTOMÁTICAS ==========
        if (msgText.includes('boa noite') || msgText.includes('boanoite')) {
            const { boanoite } = require('./comandos');
            await boanoite(message);
        }

    } catch (error) {
        logger.error(`Erro ao processar mensagem de ${message.from}`, error);
        
        try {
            await message.reply('❌ Ocorreu um erro ao processar sua mensagem. Tente novamente!');
        } catch (replyError) {
            logger.error('Erro ao enviar mensagem de erro', replyError);
        }
    }
});

// Evento: Erro de Cliente
client.on('error', (error) => {
    logger.error('Erro do cliente WhatsApp', error);
});

// Evento: Desconexão
client.on('disconnected', () => {
    logger.connection('DESCONECTADO', 'Cliente desconectado do WhatsApp');
});

// ========== GRACEFUL SHUTDOWN ==========
process.on('SIGINT', async () => {
    logger.connection('ENCERRANDO', 'Finalizando bot...');
    console.log('\n⚠️ Encerrando Kasane Teto...');
    
    try {
        rateLimiter.destroy();
        await client.destroy();
        logger.connection('ENCERRADO', 'Bot finalizado com sucesso');
        process.exit(0);
    } catch (error) {
        logger.error('Erro ao encerrar bot', error);
        process.exit(1);
    }
});

// ========== INICIALIZAÇÃO ==========
logger.info('🎤 Kasane Teto Bot iniciando...');
client.initialize();