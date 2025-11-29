const axios = require("axios");
const { MessageMedia } = require("whatsapp-web.js");

module.exports = async (message, client) => {
    try {
        await message.reply("🎀 Procurando uma foto anime fofinha... aguarde 💕");

        const url = "https://api.waifu.pics/sfw/waifu";

        const { data } = await axios.get(url);

        const imageUrl = data.url;

        const img = await MessageMedia.fromUrl(imageUrl);

        await client.sendMessage(message.from, img, {
            caption: "✨ Sua waifu chegou! ~ Kasane Teto 🎤"
        });

    } catch (e) {
        console.error(e);
        message.reply("❌ A Teto-chan engasgou com um pão e não achou a imagem 😭");
    }
};
