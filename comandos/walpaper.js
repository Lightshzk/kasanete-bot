const axios = require("axios");
const { MessageMedia } = require("whatsapp-web.js");

module.exports = async (message, client) => {
    try {
        const api = "https://api.waifu.pics/sfw/waifu";
        const { data } = await axios.get(api);

        const media = await MessageMedia.fromUrl(data.url);
        await client.sendMessage(message.from, media, { caption: "🖼️✨ Wallpaper anime entregue!" });

    } catch (err) {
        console.error(err);
        message.reply("❌ O servidor de wallpapers dormiu 😪");
    }
};
