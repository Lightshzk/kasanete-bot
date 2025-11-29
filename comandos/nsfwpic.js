const { MessageMedia } = require("whatsapp-web.js");
const axios = require("axios");
const db = require("../utils/database");

// Função para verificar se usuário é VIP
const isVIP = async (userId) => {
    try {
        const user = await db.getUser(userId);
        return user?.vip === 1 || false;
    } catch (error) {
        console.error('Erro ao verificar VIP:', error);
        return false;
    }
};

exports.nsfwpic = async (message, client) => {
    try {
        // 1. Verificar se é grupo
        const chat = await message.getChat();
        if (chat.isGroup) {
            return message.reply("❌ *NSFW proibido em grupos!*\n\n🔒 Use este comando apenas no privado.");
        }

        // 2. Verificar se é VIP
        const userId = message.from;
        const vipStatus = await isVIP(userId);
        
        if (!vipStatus) {
            return message.reply(`⭐ *Comando VIP Exclusivo!*

❌ Você não é VIP.

💎 Este comando é exclusivo para membros VIP.
📱 Entre em contato com o administrador para se tornar VIP!

👑 *Benefícios VIP:*
- Acesso a comandos NSFW
- Prioridade no bot
- Recursos exclusivos`);
        }

        await message.reply("🔞 Buscando...");

        // 3. Buscar imagem
        const response = await axios.get('https://api.waifu.pics/nsfw/waifu', {
            timeout: 10000
        });
        const imageUrl = response.data.url;

        // 4. Enviar
        const media = await MessageMedia.fromUrl(imageUrl);
        await client.sendMessage(message.from, media, {
            caption: '🔞 *Conteúdo NSFW* 🔞\n\n⭐ Exclusivo VIP'
        });

        console.log('✅ NSFW enviado para VIP:', userId);

    } catch (error) {
        console.error('❌ Erro NSFW:', error.message);
        await message.reply("❌ Erro ao buscar conteúdo.");
    }
};