const { MessageMedia } = require("whatsapp-web.js");
const axios = require("axios");

exports.kitsune = async (message, client) => {
    try {
        await message.reply("🦊 Buscando kitsune...");

        // API para raposas/kitsune
        const response = await axios.get('https://randomfox.ca/floof/');
        const imageUrl = response.data.image;

        const media = await MessageMedia.fromUrl(imageUrl);
        await client.sendMessage(message.from, media, {
            caption: '🦊 *Kitsune fofo!* ✨'
        });

    } catch (error) {
        console.error('Erro kitsune:', error);
        await message.reply("❌ Erro ao buscar kitsune.");
    }
};