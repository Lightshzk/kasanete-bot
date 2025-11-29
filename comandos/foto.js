const axios = require('axios');
const path = require('path');
const { MessageMedia } = require('whatsapp-web.js');

module.exports = async (message, client) => {
    try {
        await message.reply('📸 Buscando uma foto fofa para você...');

        const apiResponse = await axios.get('https://api.nekosia.cat/v1/images/random', { 
            timeout: 10000 
        });
        
        const imageUrl = apiResponse.data?.url || apiResponse.data?.image;

        if (!imageUrl) {
            throw new Error('URL inválida retornada pela API.');
        }

        console.log('✅ URL da imagem obtida:', imageUrl);

        const imageResponse = await axios.get(imageUrl, {
            responseType: 'arraybuffer',
            headers: { 'User-Agent': 'Mozilla/5.0' },
            timeout: 15000
        });

        const imageBase64 = Buffer.from(imageResponse.data, 'binary').toString('base64');
        const extension = path.extname(imageUrl).replace('.', '') || 'jpg';
        const mimeType = `image/${extension}`;
        
        const media = new MessageMedia(mimeType, imageBase64, `nekosia.${extension}`);

        await client.sendMessage(message.from, media, { 
            caption: '🌸 Kasane Teto te manda um sorriso~ 💞' 
        });

        console.log('✅ Foto enviada com sucesso!');

    } catch (err) {
        console.error('❌ Erro no comando !foto:', err.message);
        await message.reply('❌ Não consegui enviar a foto agora. Tente novamente mais tarde!');
    }
};