/**
 * Exemplo de Comando Personalizado
 * Use este arquivo como template para criar novos comandos
 * 
 * Importe este comando em teto.js:
 * const { tetoSay } = require('./comandos/tetosay');
 */

const Validator = require('../utils/validator');

/**
 * Comando: Teto Fala
 * Faz Teto repetir algo que você disse
 */
exports.tetoSay = async (message, args) => {
    try {
        // Validar argumentos
        if (args.length === 0) {
            await message.reply('🎤 Me diga algo para Teto repetir!\n_Uso: !tetosay <mensagem>_');
            return;
        }

        // Sanitizar entrada
        const text = Validator.sanitize(args.join(' '));

        // Validar comprimento
        if (!Validator.validateLength(text, 1, 200)) {
            await message.reply('❌ Mensagem muito longa! Máximo de 200 caracteres.');
            return;
        }

        // Remover caracteres perigosos
        const cleanText = Validator.removeSpecialChars(text);

        // Responder com a mensagem
        await message.reply(`🎤 *Teto diz:*\n\n${cleanText}`);

        console.log(`✅ Comando tetosay executado: "${text}"`);

    } catch (error) {
        console.error('❌ Erro em tetosay:', error);
        await message.reply('❌ Erro ao processar comando!');
    }
};

/**
 * Comando: Kasane Info
 * Mostra informações sobre Kasane Teto
 */
exports.kasaneInfo = async (message) => {
    try {
        const info = `
🎤 *KASANE TETO* ♪

📝 **Informações:**
• Nome: 初音ミク (Hatsune Miku) - Versão Kasane Teto
• Tipo: Vocaloid
• Idioma: Japonês/Português
• Criadora: Uma comunidade apaixonada!

🎵 **Características:**
• Voz única e fofa
• Ótima para criar música
• Comunidade ativa

❤️ **Sobre este bot:**
Feito especialmente para os fãs de Kasane Teto!

_Use !menu para ver todos os comandos!_
        `;

        await message.reply(info);

    } catch (error) {
        console.error('❌ Erro em kasaneInfo:', error);
        await message.reply('❌ Erro ao processar comando!');
    }
};

/**
 * Comando: Dados do Usuário
 * Mostra dados coletados sobre o usuário
 */
exports.userStats = async (message) => {
    try {
        const userId = message.from;
        const userName = message._data?.notifyName || 'Desconhecido';
        const isGroup = message.isGroupMsg;
        const groupName = isGroup ? message._data?.groupData?.subject || 'Grupo' : 'DM';

        const stats = `
👤 *SUAS ESTATÍSTICAS*

📊 **Informações:**
• Nome: ${userName}
• ID: ${userId}
• Tipo: ${isGroup ? 'Grupo' : 'Conversa Privada'}
• ${isGroup ? `Grupo: ${groupName}` : 'Chat privado com o bot'}

💡 **Dica:** Use !perfil para ver seu XP e nível!

_Mantenha conversando para ganhar XP! 🎤✨_
        `;

        await message.reply(stats);

    } catch (error) {
        console.error('❌ Erro em userStats:', error);
        await message.reply('❌ Erro ao processar comando!');
    }
};

/**
 * Validação e Tratamento de Erro Global
 */
async function handleCommandError(message, error, commandName) {
    console.error(`❌ Erro no comando ${commandName}:`, error);
    
    const errorMessage = `
❌ *Erro ao executar ${commandName}*

_Detalhes: ${error.message || 'Erro desconhecido'}_

Por favor, tente novamente ou use !menu.
    `;

    try {
        await message.reply(errorMessage);
    } catch (replyError) {
        console.error('Erro ao enviar mensagem de erro:', replyError);
    }
}

module.exports = {
    tetoSay: exports.tetoSay,
    kasaneInfo: exports.kasaneInfo,
    userStats: exports.userStats,
    handleCommandError
};
