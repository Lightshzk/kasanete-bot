const { MessageMedia } = require('whatsapp-web.js');

exports.sticker = async (message, client) => {
    try {
        // Verificar se a mensagem tem mídia citada
        if (!message.hasQuotedMsg) {
            return message.reply('❌ Responda a uma imagem ou GIF com *!sticker*');
        }

        const quotedMsg = await message.getQuotedMessage();

        // Verificar se é imagem ou vídeo
        if (!quotedMsg.hasMedia) {
            return message.reply('❌ A mensagem citada não contém mídia!');
        }

        await message.reply('🎨 Criando sticker...');

        // Baixar mídia
        const media = await quotedMsg.downloadMedia();

        // Enviar como sticker
        await client.sendMessage(message.from, media, {
            sendMediaAsSticker: true,
            stickerAuthor: 'Kasane Teto',
            stickerName: 'Teto Bot'
        });

    } catch (error) {
        console.error('Erro ao criar sticker:', error);
        await message.reply('❌ Erro ao criar sticker.');
    }
};