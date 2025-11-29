const fs = require('fs');
const path = require('path');

// Arquivo para salvar configurações NSFW dos usuários
const nsfwConfigPath = path.join(__dirname, '../data/nsfw_users.json');

// Garantir que o arquivo existe
if (!fs.existsSync(path.dirname(nsfwConfigPath))) {
    fs.mkdirSync(path.dirname(nsfwConfigPath), { recursive: true });
}
if (!fs.existsSync(nsfwConfigPath)) {
    fs.writeFileSync(nsfwConfigPath, JSON.stringify({}));
}

// Carregar configurações
const loadNSFWConfig = () => {
    try {
        return JSON.parse(fs.readFileSync(nsfwConfigPath, 'utf8'));
    } catch {
        return {};
    }
};

// Salvar configurações
const saveNSFWConfig = (config) => {
    fs.writeFileSync(nsfwConfigPath, JSON.stringify(config, null, 2));
};

exports.nsfw = async (message, args) => {
    const userId = message.from;
    const config = loadNSFWConfig();
    
    if (!args[0]) {
        return message.reply(`🔞 *Configuração NSFW*

Status atual: ${config[userId] ? '✅ Ativado' : '❌ Desativado'}

Para alterar, use:
- \`!nsfw on\` - Ativar
- \`!nsfw off\` - Desativar`);
    }
    
    const action = args[0].toLowerCase();
    
    if (action === 'on') {
        config[userId] = true;
        saveNSFWConfig(config);
        return message.reply('✅ NSFW ativado! Agora você pode usar comandos NSFW no privado.');
    } else if (action === 'off') {
        config[userId] = false;
        saveNSFWConfig(config);
        return message.reply('❌ NSFW desativado!');
    } else {
        return message.reply('❌ Use: `!nsfw on` ou `!nsfw off`');
    }
};