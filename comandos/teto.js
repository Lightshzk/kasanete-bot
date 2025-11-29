const axios = require("axios");
const { MessageMedia } = require("whatsapp-web.js");

const tetoImages = [
    "https://i.imgur.com/bEMpY0y.png",
    "https://i.imgur.com/6WQ3uNc.png",
    "https://i.imgur.com/4DQkCzL.png",
    "https://i.imgur.com/x73p9tB.png"
];

module.exports = async (message, client) => {
    try {
        const img = tetoImages[Math.floor(Math.random() * tetoImages.length)];
        const media = await MessageMedia.fromUrl(img);

        await client.sendMessage(message.from, media, { caption: "🎤✨ Kasane Teto te abençoou com fofura!" });

    } catch (err) {
        console.error(err);
        message.reply("❌ Teto-chan caiu da cama tentando mandar a foto 😭");
    }
};
