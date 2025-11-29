const fs = require('fs');
const path = require('path');
const playdl = require('play-dl');
const { MessageMedia } = require('whatsapp-web.js');
const Canvas = require('canvas');

exports.play = async (message, args) => {
    if (!args.length) return message.reply('❌ Digite o nome da música!');

    const query = args.join(' ');
    await message.reply(`🎵 Buscando: ${query}...`);

    try {
        const tempDir = path.join(__dirname, 'temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        const results = await playdl.search(query, { limit: 1, source: { youtube: 'video' } });
        if (!results.length) return message.reply('❌ Música não encontrada.');

        const track = results[0];
        
        // Verificar se tem URL válida
        if (!track.url) {
            return message.reply('❌ Não foi possível obter a URL da música.');
        }

        const sanitizedName = track.title.replace(/[^a-z0-9]/gi, '_').substring(0, 50);
        const audioPath = path.join(tempDir, `${sanitizedName}_${Date.now()}.mp3`);
        const imagePath = path.join(tempDir, `${sanitizedName}_${Date.now()}.png`);

        // Baixar áudio
        const stream = await playdl.stream(track.url);
        const writeStream = fs.createWriteStream(audioPath);
        stream.stream.pipe(writeStream);

        // Gerar imagem com Canvas
        const canvas = Canvas.createCanvas(800, 450);
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const thumbnailUrl = track.thumbnails?.[0]?.url || track.thumbnails?.[track.thumbnails.length - 1]?.url;
        if (thumbnailUrl) {
            const cover = await Canvas.loadImage(thumbnailUrl);
            ctx.drawImage(cover, 50, 50, 350, 350);
        }

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 40px Sans';
        ctx.fillText(track.title.substring(0, 30), 420, 150);

        ctx.font = '28px Sans';
        const channelName = track.channel?.name || 'Desconhecido';
        ctx.fillText(channelName.substring(0, 25), 420, 220);
        
        const duration = track.durationRaw || 'N/A';
        ctx.fillText(`Duração: ${duration}`, 420, 280);

        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync(imagePath, buffer);

        const imageMedia = MessageMedia.fromFilePath(imagePath);
        await message.reply(imageMedia);

        writeStream.on('finish', async () => {
            try {
                if (!fs.existsSync(audioPath) || fs.statSync(audioPath).size === 0) {
                    throw new Error('Arquivo de áudio inválido');
                }

                const audioMedia = MessageMedia.fromFilePath(audioPath);
                await message.reply(audioMedia, undefined, { sendAudioAsVoice: false });

                setTimeout(() => {
                    try {
                        if (fs.existsSync(audioPath)) fs.unlinkSync(audioPath);
                        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
                    } catch (cleanupErr) {
                        console.error('Erro ao limpar arquivos:', cleanupErr);
                    }
                }, 2000);

            } catch (sendErr) {
                console.error('Erro ao enviar áudio:', sendErr);
                await message.reply('❌ Erro ao enviar o áudio.');
                
                if (fs.existsSync(audioPath)) fs.unlinkSync(audioPath);
                if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
            }
        });

        writeStream.on('error', (err) => {
            console.error('Erro ao baixar áudio:', err);
            message.reply('❌ Erro ao baixar o áudio.');
            
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        });

    } catch (err) {
        console.error('Erro no comando play:', err);
        await message.reply(`❌ Erro ao buscar a música: ${err.message}`);
    }
};