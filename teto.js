const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { menu, sendMenu, sendMenuWithGif } = require('./comandos/menu');
const { sobre, ping, foto, erro, boanoite } = require('./comandos');

const startTime = new Date();

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Mapa de comandos
const commands = {
    '!menu': async (message) => {
        const user = message._data?.notifyName || 'Usuário';
        const isVip = false; // Implemente sua lógica de VIP aqui
        const cargo = '-'; // Implemente sua lógica de cargo aqui
        
       
        await sendMenu(message, client, user, isVip, cargo);
        
    },
    
    '!sobre': async (message) => {
        await message.reply(sobre());
    },
    
    '!ping': async (message) => {
        await message.reply(ping(message, startTime));
    },
    
    '!foto': async (message) => {
        await foto(message, client);
    },
    
    '!boanoite': async (message) => {
        await boanoite(message);
    }
};

// Event: QR Code
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('📱 Escaneie o QR Code para conectar a Kasane Teto!');
});

// Event: Client Ready
client.on('ready', () => {
    console.log('🎀 Kasane Teto está online e pronta para cantar!');
    console.log(`Iniciada em: ${startTime.toLocaleString('pt-BR')}`);
});

// Event: Message Handler
client.on('message', async (message) => {
    try {
        const msg = message.body.toLowerCase().trim();

        console.log(`📨 Mensagem de ${message._data?.notifyName || 'Anônimo'}: ${msg}`);

        // Verificar se é um comando
        if (msg.startsWith('!')) {
            const commandKey = msg.split(' ')[0];
            const command = commands[commandKey];
            
            if (command) {
                await command(message);
                console.log(`✅ Comando executado: ${msg}`);
            } else {
                await message.reply(erro(message));
                console.log(`⚠️ Comando inválido: ${msg}`);
            }
        }

        // Respostas automáticas
        if (msg.includes('boa noite') || msg.includes('boanoite')) {
            await boanoite(message);
        }

    } catch (error) {
        console.error('❌ Erro ao processar mensagem:', error);
        await message.reply('❌ Ocorreu um erro ao processar seu comando. Tente novamente!');
    }
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('⚠️ Encerrando Kasane Teto...');
    await client.destroy();
    process.exit(0);
});

// Inicializar
client.initialize();