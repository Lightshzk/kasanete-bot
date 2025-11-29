const { MessageMedia } = require('whatsapp-web.js');

exports.toimg = async (message, client) => {
    try {
        if (!message.hasQuotedMsg) {
            return message.reply('❌ Responda a um sticker com *!toimg*');
        }

        const quotedMsg = await message.getQuotedMessage();

        if (quotedMsg.type !== 'sticker') {
            return message.reply('❌ Isso não é um sticker!');
        }

        await message.reply('🖼️ Convertendo sticker...');

        const media = await quotedMsg.downloadMedia();
        
        await client.sendMessage(message.from, media, {
            caption: '✅ Sticker convertido em imagem!'
        });

    } catch (error) {
        console.error('Erro ao converter sticker:', error);
        await message.reply('❌ Erro ao converter sticker.');
    }
};