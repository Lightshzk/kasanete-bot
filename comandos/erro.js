exports.erro = (message) => {
    const userName = message._data?.notifyName || message.from.replace('@c.us','');
    return `
❌ Opa, ${userName}! Parece que você digitou um comando inválido.

🌸 Para ver todos os comandos disponíveis, envie:
➡️ *!menu*

🎀 Assim você não se perde e pode se divertir com todos os meus recursos! 💖
`;
};
