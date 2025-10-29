const dono = require('../config/dono');

// Verificar se usuário é dono
exports.verificarDono = (message) => {
    return dono.isDono(message.from);
};

// Comando: !dono (mostra info do dono)
exports.infoDono = () => {
    const info = dono.getInfo();
    return `┌─═━┈┈━═─⊱👑⊰─═━┈┈━═─┐
┊  ✦✧✦ 𝐈𝐍𝐅𝐎 𝐃𝐎 𝐃𝐎𝐍𝐎 ✦✧✦
└─═━┈┈━═─⊱👑⊰─═━┈┈━═─┘

👑 *Nome:* ${info.nome}
🎤 *Apelido:* ${info.apelido}
📱 *Contato:* wa.me/${dono.numero.replace('@c.us', '')}
⚙️ *Autorizados:* ${info.qtdAutorizados}

_Criador do Kasane Teto Bot_ ✨`;
};

// Comando: !broadcast (enviar mensagem para todos)
exports.broadcast = async (client, message, texto) => {
    if (!dono.isDono(message.from)) {
        return await message.reply('❌ Este comando é exclusivo do dono!');
    }

    try {
        const chats = await client.getChats();
        let enviados = 0;
        let falhas = 0;

        await message.reply(`📢 Iniciando broadcast para ${chats.length} conversas...`);

        for (const chat of chats) {
            try {
                await client.sendMessage(chat.id._serialized, texto);
                enviados++;
                await new Promise(resolve => setTimeout(resolve, 1000)); // Delay de 1s
            } catch (error) {
                falhas++;
                console.error(`Erro ao enviar para ${chat.name}:`, error);
            }
        }

        return await message.reply(`✅ Broadcast concluído!\n📤 Enviados: ${enviados}\n❌ Falhas: ${falhas}`);
    } catch (error) {
        console.error('Erro no broadcast:', error);
        return await message.reply('❌ Erro ao executar broadcast!');
    }
};

// Comando: !status (info do bot - só dono)
exports.statusBot = async (client, startTime) => {
    const uptime = Date.now() - startTime.getTime();
    const dias = Math.floor(uptime / (1000 * 60 * 60 * 24));
    const horas = Math.floor((uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));

    const chats = await client.getChats();
    const grupos = chats.filter(chat => chat.isGroup).length;
    const privados = chats.filter(chat => !chat.isGroup).length;

    return `┌─═━┈┈━═─⊱⚙️⊰─═━┈┈━═─┐
┊  ✦✧✦ 𝐒𝐓𝐀𝐓𝐔𝐒 𝐃𝐎 𝐁𝐎𝐓 ✦✧✦
└─═━┈┈━═─⊱⚙️⊰─═━┈┈━═─┘

⏱️ *Uptime:* ${dias}d ${horas}h ${minutos}m
💬 *Total de Chats:* ${chats.length}
👥 *Grupos:* ${grupos}
👤 *Privados:* ${privados}
📱 *WhatsApp:* Conectado ✅
🤖 *Bot:* Kasane Teto v1.0.0
👑 *Dono:* ${dono.nome}

_Sistema operando normalmente_ ⚡`;
};

// Comando: !banir (banir usuário do bot)
const bannedUsers = new Set();

exports.banirUsuario = async (message) => {
    if (!dono.isDono(message.from)) {
        return await message.reply('❌ Este comando é exclusivo do dono!');
    }

    const mentioned = await message.getMentions();
    if (mentioned.length === 0) {
        return await message.reply('❌ Mencione alguém para banir!\n\nUso: !banir @usuario');
    }

    const userToBan = mentioned[0].id._serialized;
    bannedUsers.add(userToBan);
    
    return await message.reply(`✅ Usuário banido com sucesso!\n🚫 ${mentioned[0].pushname} não poderá mais usar o bot.`);
};

// Comando: !desbanir
exports.desbanirUsuario = async (message) => {
    if (!dono.isDono(message.from)) {
        return await message.reply('❌ Este comando é exclusivo do dono!');
    }

    const mentioned = await message.getMentions();
    if (mentioned.length === 0) {
        return await message.reply('❌ Mencione alguém para desbanir!\n\nUso: !desbanir @usuario');
    }

    const userToUnban = mentioned[0].id._serialized;
    bannedUsers.delete(userToUnban);
    
    return await message.reply(`✅ Usuário desbanido!\n✨ ${mentioned[0].pushname} pode usar o bot novamente.`);
};

// Verificar se usuário está banido
exports.isUserBanned = (userId) => {
    return bannedUsers.has(userId);
};

// Comando: !eval (executar código - CUIDADO!)
exports.evalCode = async (message, code) => {
    if (!dono.isDonoPrincipal(message.from)) {
        return await message.reply('❌ Este comando é exclusivo do dono principal!');
    }

    try {
        let result = eval(code);
        if (typeof result === 'object') {
            result = JSON.stringify(result, null, 2);
        }
        return await message.reply(`✅ Resultado:\n\`\`\`${result}\`\`\``);
    } catch (error) {
        return await message.reply(`❌ Erro:\n\`\`\`${error.message}\`\`\``);
    }
};