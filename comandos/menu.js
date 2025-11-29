const { MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');

// Função para enviar menu com foto
exports.sendMenu = async (message, client, pushname, isVip = false, isCargo = '-') => {
    const prefix = '!';
    const menuText = this.menu(prefix, pushname, isVip, isCargo);
    
    try {
        // Caminho da imagem do menu
        const imagePath = path.join(__dirname, '../assets/menu.gif');
        
        // Verificar se a imagem existe
        if (fs.existsSync(imagePath)) {
            const media = MessageMedia.fromFilePath(imagePath);
            await client.sendMessage(message.from, media, { 
                caption: menuText 
            });
            console.log('✅ Menu enviado com sucesso com imagem!');
        } else {
            // Se não houver imagem, envia apenas o texto
            await message.reply(menuText);
            console.warn('⚠️ Imagem do menu não encontrada em:', imagePath);
        }
    } catch (error) {
        console.error('❌ Erro ao enviar menu com foto:', error);
        // Fallback: envia apenas texto
        await message.reply(menuText);
    }
};

// Função do texto do menu (mantém compatibilidade)
exports.menu = (prefix, pushname, isVip = false, isCargo = '-') => {
    return `┌─═━┈┈━═─⊱🎤⊰─═━┈┈━═─┐
┊  ✦✧✦ 𝐊𝐀𝐒𝐀𝐍𝐄 𝐓𝐄𝐓𝐎 ✦✧✦
└─═━┈┈━═─⊱🎤⊰─═━┈┈━═─┘
╎
┌─═━┈┈━═─⊱🎵⊰─═━┈┈━═─┐
┊╭ ── ⋆⋅☆⋅⋆ ── ╮
┊┊🎵 𝚄𝚂𝚄Á𝚁𝙸𝙾: ${pushname}
┊┊🎤 𝚅𝙸𝙿: ${isVip ? 'Sim ✅' : 'Não ❌'}
┊┊🎵 𝙲𝙰𝚁𝙶𝙾: ${isCargo}
┊┊🎤 𝙳𝙾𝙽𝙾: Lightshzk
┊┊🎵 𝙱𝙾𝚃: © 𝐊𝐀𝐒𝐀𝐍𝐄-𝐁𝐎𝐓 ♪
┊╰ ── ⋆⋅☆⋅⋆ ── ╯
└─═━┈┈━═─⊱🎵⊰─═━┈┈━═─┘
╎
┌─═━┈┈━═─⊱🎤⊰─═━┈┈━═─┐
┊ 『 🎵 』 𝐂𝐎𝐌𝐀𝐍𝐃𝐎𝐒 𝐆𝐄𝐑𝐀𝐈𝐒 『 🎵 』
└─═━┈┈━═─⊱🎤⊰─═━┈┈━═─┘
╎
┊🎶 ${prefix}menu - Mostrar este menu fofinho
┊🎤 ${prefix}sobre - Saber mais sobre Teto-Chan
┊🎶 ${prefix}ping - Ver tempo online e latência
┊🎤 ${prefix}perfil - Ver seu perfil e nível
┊🎶 ${prefix}foto - Receber uma foto fofa
┊🎤 ${prefix}boanoite - Receber mensagem de boa noite
╎
┌─═━┈┈━═─⊱🎵⊰─═━┈┈━═─┐
┊ 『 🎧 』 𝐌Ú𝐒𝐈𝐂𝐀 & 𝐌Í𝐃𝐈𝐀 『 🎧 』
└─═━┈┈━═─⊱🎵⊰─═━┈┈━═─┘
╎
┊🎵 ${prefix}play <música> - Baixar música do YouTube
┊🎤 ${prefix}sticker - Criar sticker de imagem/gif
┊🎶 ${prefix}toimg - Converter sticker em imagem
╎
┌─═━┈┈━═─⊱🌸⊰─═━┈┈━═─┐
┊ 『 🎌 』 𝐀𝐍𝐈𝐌𝐄 & 𝐅𝐔𝐍 『 🎌 』
└─═━┈┈━═─⊱🌸⊰─═━┈┈━═─┘
╎
┊🎌 ${prefix}fotoanime - Foto de anime aleatória
┊🐱 ${prefix}neko - Foto fofa de neko
┊🦊 ${prefix}kitsune - Foto de kitsune (raposa)
┊🔞 ${prefix}nsfwpic - Conteúdo NSFW (18+)
╎
┌─═━┈┈━═─⊱👥⊰─═━┈┈━═─┐
┊ 『 📱 』 𝐆𝐑𝐔𝐏𝐎 & 𝐒𝐎𝐂𝐈𝐀𝐋 『 📱 』
└─═━┈┈━═─⊱👥⊰─═━┈┈━═─┘
╎
┊👥 ${prefix}grupooficial - Link do grupo oficial
╎
┌─═━┈┈━═─⊱💖⊰─═━┈┈━═─┐
┊  ✦✧✦ Divirta-se com a Kasane Teto Bot! ✦✧✦
└─═━┈┈━═─⊱💖⊰─═━┈┈━═─┘

_Digite o comando desejado para começar! 🎤✨_

💡 *Dica:* Cada mensagem te dá XP! Continue conversando para subir de nível! 📈`;
};

// Função alternativa: menu com foto de URL
exports.sendMenuFromUrl = async (message, client, pushname, isVip = false, isCargo = '-') => {
    const prefix = '!';
    const menuText = this.menu(prefix, pushname, isVip, isCargo);
    
    try {
        // URL da imagem (exemplo com imagem da Kasane Teto)
        const imageUrl = 'https://i.imgur.com/exemplo.jpg'; // Substitua pela URL da sua imagem
        
        const media = await MessageMedia.fromUrl(imageUrl);
        await client.sendMessage(message.from, media, { 
            caption: menuText 
        });
    } catch (error) {
        console.error('❌ Erro ao enviar menu com foto de URL:', error);
        await message.reply(menuText);
    }
};

// Função para menu com GIF animado
exports.sendMenuWithGif = async (message, client, pushname, isVip = false, isCargo = '-') => {
    const prefix = '!';
    const menuText = this.menu(prefix, pushname, isVip, isCargo);
    
    try {
        const gifPath = path.join(__dirname, '../assets/menu.gif');
        
        if (fs.existsSync(gifPath)) {
            const media = MessageMedia.fromFilePath(gifPath);
            await client.sendMessage(message.from, media, { 
                caption: menuText,
                sendVideoAsGif: true // Envia como GIF animado
            });
            console.log('✅ Menu enviado com GIF animado!');
        } else {
            console.warn('⚠️ GIF não encontrado, enviando texto apenas');
            await message.reply(menuText);
        }
    } catch (error) {
        console.error('❌ Erro ao enviar menu com GIF:', error);
        await message.reply(menuText);
    }
};