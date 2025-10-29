exports.ping = (message, startTime) => {
    const now = new Date();
    const diff = now - startTime;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const ping = Math.floor(Math.random() * 90) + 30; // resposta simulada (30–120ms)
    const userName = message._data?.notifyName || message.from.replace('@c.us','');

    return `
◈• Bom dia!

◈• Usuário: @${userName}

◈• O Bot se encontra online por:
◈• ${days} Dia(s) ${hours} Hora(s) ${minutes} Minuto(s) ${seconds} Segundo(s)

◈• Velocidade de Resposta: ${ping} ms 💖
🌸 Kasane Teto está pronta para cantar! 🎶
`;
};
