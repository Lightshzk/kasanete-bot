const { MessageMedia } = require("whatsapp-web.js");
const axios = require("axios");

exports.neko = async (message, client) => {
    try {
        await message.reply("🐱 Buscando neko...");

        const response = await axios.get('https://api.waifu.pics/sfw/neko');
        const imageUrl = response.data.url;

        const media = await MessageMedia.fromUrl(imageUrl);
        await client.sendMessage(message.from, media, {
            caption: '🐱 *Neko fofo!* ✨'
        });

    } catch (error) {
        console.error('Erro neko:', error);
        await message.reply("❌ Erro ao buscar neko.");
    }
};