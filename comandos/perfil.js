const db = require('../utils/database');

exports.perfil = async (message) => {
    try {
        const userId = message.from;
        const user = message._data?.notifyName || 'Usuário';

        // Buscar dados do usuário no banco
        const userData = await db.getUser(userId);

        if (!userData) {
            return message.reply('❌ Você ainda não tem um perfil! Envie mensagens para ganhar XP.');
        }

        const { level, xp, username } = userData;
        const xpNeeded = level * 100; // XP necessário para próximo nível

        const perfil = `👤 *Perfil de ${username}*

📊 *Nível:* ${level}
✨ *XP:* ${xp}/${xpNeeded}
🎯 *Progresso:* ${Math.floor((xp / xpNeeded) * 100)}%

🎤 Continue enviando mensagens para subir de nível!`;

        await message.reply(perfil);

    } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        await message.reply('❌ Erro ao buscar perfil.');
    }
};