const db = require('../utils/database');

exports.setvip = async (message, args) => {
    try {
        // Verificar se quem está usando é admin/dono
        const donos = ['5511999999999@c.us']; // Coloque SEU número aqui
        
        if (!donos.includes(message.from)) {
            return message.reply('❌ Apenas o dono pode usar este comando!');
        }

        // Verificar se mencionou alguém
        const mentionedIds = await message.getMentions();
        
        if (mentionedIds.length === 0) {
            return message.reply('❌ Mencione um usuário!\n\nUso: `!setvip @usuario`');
        }

        const targetUser = mentionedIds[0];
        const targetId = targetUser.id._serialized;

        // Verificar ação (add ou remove)
        const action = args[0]?.toLowerCase();

        if (action === 'remove' || action === 'rem') {
            // Remover VIP
            await db.setVIP(targetId, false);
            return message.reply(`❌ VIP removido de @${targetUser.id.user}!`);
        } else {
            // Adicionar VIP
            await db.setVIP(targetId, true);
            return message.reply(`✅ @${targetUser.id.user} agora é VIP! ⭐`);
        }

    } catch (error) {
        console.error('Erro ao setar VIP:', error);
        await message.reply('❌ Erro ao modificar VIP.');
    }
};