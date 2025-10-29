exports.boanoite = async (message) => {
    const nome = message._data?.notifyName || 'amigo';
    const resposta = `
🌙 Boa noite, ${nome}!  
Espero que você tenha sonhos doces e descanse bem! 💫  
- Com carinho, Kasane Teto 🎀
`;
    await message.reply(resposta);
};
