const axios = require('axios');
const path = require('path');
const { MessageMedia } = require('whatsapp-web.js');

exports.foto = async (message, client) => {
    try {
        const apiResponse = await axios.get('https://api.nekosia.cat/v1/images/random', { timeout: 10000 });
        const imageUrl = apiResponse.data?.url || apiResponse.data?.image;

        if (!imageUrl) throw new Error('URL inválida retornada pela API.');

        const imageResponse = await axios.get(imageUrl, {
            responseType: 'arraybuffer',
            headers: { 'User-Agent': 'Mozilla/5.0' },
            timeout: 15000
        });

        const imageBase64 = Buffer.from(imageResponse.data, 'binary').toString('base64');
        const extension = path.extname(imageUrl).replace('.', '') || 'jpg';
        const media = new MessageMedia(`image/${extension}`, imageBase64, `nekosia.${extension}`);

        await client.sendMessage(message.from, media, { caption: '🌸 Kasane Teto te manda um sorriso~ 💞' });
    } catch (err) {
        console.error('Erro no comando !foto:', err.message);
        await message.reply('❌ Não consegui enviar a foto agora. Tente novamente mais tarde!');
    }
};
