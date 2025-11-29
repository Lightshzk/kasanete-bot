const { MessageMedia } = require('whatsapp-web.js');

module.exports = async (message) => {
    const boaNoiteMessages = [
        '🌙 Boa noite! Que seus sonhos sejam tão doces quanto você! ✨💤',
        '🌟 Boa noite! Durma bem e tenha sonhos incríveis! 🌙💫',
        '💤 Boa noite! Que a lua ilumine seus sonhos! 🌙✨',
        '🌙 Descanse bem! Amanhã será um dia maravilhoso! 💖',
        '✨ Boa noite! Feche os olhos e sonhe com coisas lindas! 🌙'
    ];
    
    const randomMessage = boaNoiteMessages[Math.floor(Math.random() * boaNoiteMessages.length)];
    
    try {
        // Você pode adicionar uma imagem de boa noite aqui
        await message.reply(randomMessage);
    } catch (error) {
        console.error('Erro ao enviar boa noite:', error);
        await message.reply('🌙 Boa noite! ✨');
    }
};