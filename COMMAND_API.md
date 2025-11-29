# 📚 Documentação da API de Comandos

## Visão Geral

O Kasane Teto Bot usa um sistema modular de comandos que permite fácil extensão e manutenção.

## 🏗️ Arquitetura

### CommandManager

O `CommandManager` é responsável por:

- **Registrar** novos comandos
- **Validar** argumentos
- **Executar** comandos com permissões
- **Gerenciar** aliases e categorias
- **Gerar** help dinâmico

### Interfaces Principais

```javascript
// Registrar um comando
commandManager.register({
    name: string,                    // Nome do comando (obrigatório)
    description: string,             // Descrição curta (obrigatório)
    category: string,                // Categoria do menu
    aliases: string[],               // Nomes alternativos
    minArgs: number,                 // Mínimo de argumentos
    maxArgs: number,                 // Máximo de argumentos
    cooldown: number,                // Segundos entre usos
    adminOnly: boolean,              // Apenas admins
    ownerOnly: boolean,              // Apenas dono
    execute: AsyncFunction,          // Função executora (obrigatório)
    examples: string[]               // Exemplos de uso
});
```

## 🎮 Tipos de Resposta

### Retorno de Sucesso

```javascript
execute: async (message, args, context) => {
    await message.reply('✅ Comando executado com sucesso!');
    return true;
}
```

### Retorno com Erro

```javascript
execute: async (message, args, context) => {
    if (!args.length) {
        await message.reply('❌ Argumentos necessários!');
        return false;
    }
    return true;
}
```

## 📊 Contexto do Comando

Cada comando recebe um contexto com informações úteis:

```javascript
context = {
    ownerId: string,        // ID do dono do bot
    isAdmin: boolean,       // Se o usuário é admin
    rateLimited: boolean,   // Se está em rate limit
    userId: string,         // ID do usuário
    userName: string        // Nome do usuário
}
```

## 🔐 Validação de Entrada

Use o `Validator` para validar entradas:

```javascript
const Validator = require('../utils/validator');

// Verificar se está vazio
Validator.isEmpty('   '); // true

// Validar comprimento
Validator.validateLength('texto', 1, 100); // true

// Validar número
Validator.isValidNumber('123'); // true

// Validar WhatsApp ID
Validator.isValidWhatsAppId('5511999999999@c.us'); // true

// Sanitizar entrada
Validator.sanitize('<script>alert("xss")</script>'); 
// Retorna: 'scriptalertxssscript'

// Validar argumentos
const validation = Validator.validateArgs(args, 1, 5);
if (!validation.valid) {
    await message.reply(validation.error);
}

// Validar URL
Validator.isValidUrl('https://example.com'); // true

// Validar email
Validator.isValidEmail('user@example.com'); // true
```

## ⏱️ Rate Limiting

O sistema de rate limiting protege contra abuso:

```javascript
// Verificar limite do usuário
const limitCheck = rateLimiter.checkUserLimit(userId);

if (!limitCheck.allowed) {
    await message.reply(`⏱️ Aguarde ${limitCheck.resetIn}s`);
    return false;
}

// Verificar limite de comando específico
const cmdLimit = rateLimiter.checkCommandLimit(userId, 'play', 3);

if (!cmdLimit.allowed) {
    await message.reply(`Aguarde ${cmdLimit.resetIn}s`);
    return false;
}

// Adicionar aviso de spam
const warnings = rateLimiter.addSpamWarning(userId);

// Resetar limite de usuário
rateLimiter.resetUser(userId);
```

## 📝 Sistema de Logging

Use o `Logger` para registrar atividades:

```javascript
const Logger = require('../utils/logger');
const logger = new Logger({ logLevel: 'info' });

// Log de informação
logger.info('Bot iniciado com sucesso');

// Log de erro
logger.error('Erro ao conectar', error);

// Log de aviso
logger.warn('Rate limit excedido', { userId, warnings: 2 });

// Log de debug
logger.debug('Variáveis de context', context);

// Log de comando
logger.command(userId, userName, 'play', ['music-name']);

// Log de XP
logger.xp(userId, userName, 15, 5); // XP ganho, novo nível

// Log de conexão
logger.connection('CONECTADO', 'Bot pronto para comandos');
```

## 🎵 Sistema de XP

Use `XPSystem` para gerenciar XP dos usuários:

```javascript
const XPSystem = require('../utils/xp');

// Adicionar XP
const result = await XPSystem.addXP(userId, userName, 15);
console.log(result.levelUp);        // boolean
console.log(result.level);          // novo nível
console.log(result.xpGain);         // XP ganho nessa ação
console.log(result.percentProgress); // % de progresso

// Obter informações de XP
const userXP = await XPSystem.getUserXPInfo(userId);
console.log(userXP.level);         // Nível atual
console.log(userXP.totalXP);       // XP total
console.log(userXP.percentProgress); // % de progresso

// Obter leaderboard
const top10 = await XPSystem.getLeaderboard(10);
top10.forEach(user => {
    console.log(`${user.position}. ${user.username} - Nível ${user.level}`);
});
```

## 📱 Tipos de Mensagem

### Mensagem Simples

```javascript
await message.reply('Texto simples');
```

### Mensagem Formatada (Bold, Italic)

```javascript
await message.reply('*Negrito* _Itálico_ `Código`');
```

### Mensagem com Mídia

```javascript
const { MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');

// De arquivo
const media = MessageMedia.fromFilePath('./photo.jpg');
await client.sendMessage(message.from, media, { caption: 'Legenda' });

// De URL
const media = await MessageMedia.fromUrl('https://example.com/image.jpg');
await client.sendMessage(message.from, media);
```

## 🔧 Métodos da Mensagem

```javascript
// Propriedades
message.from              // ID do remetente
message.body              // Texto da mensagem
message.id                // ID único da mensagem
message.timestamp         // Timestamp
message.type              // Tipo: chat, image, etc
message.fromMe            // Se foi enviada pelo bot

// Métodos
await message.reply('Resposta');          // Responder
await message.react('👍');                // Adicionar reação
await message.pin();                      // Fixar mensagem
await message.unpin();                    // Desafixar
await message.delete(true);               // Deletar para todos
```

## 🌐 Variáveis de Ambiente

Acesse via `config`:

```javascript
const config = require('./config/environment');

config.prefix                    // '!'
config.owner.name               // 'Lightshzk'
config.owner.number             // '5511999999999'
config.xp.perMessage            // 8
config.xp.levelMultiplier       // 100
config.rateLimiting.maxMessages // 10
config.limits.maxMessageLength  // 500
config.links.grupoOficial       // URL do grupo
config.debug.enabled            // false
```

## 📋 Exemplo Completo de Comando

```javascript
/**
 * Comando: Roleta Russa
 * Jogo de chance com texto
 */
commandManager.register({
    name: 'roleta',
    description: 'Jogar roleta russa com Teto',
    category: 'Diversão',
    aliases: ['roulette', 'sorte'],
    cooldown: 10,
    examples: ['roleta', 'roulette'],
    execute: async (message, args, context) => {
        try {
            // Validar entrada
            const validation = Validator.validateArgs(args, 0, 0);
            if (!validation.valid) {
                await message.reply(validation.error);
                return false;
            }

            // Log do comando
            logger.command(
                message.from, 
                context.userName,
                'roleta',
                []
            );

            // Lógica do comando
            const chance = Math.random();
            const messages = [
                '🎰 *CLIQUE* *CLIQUE* 💥 BOOM!\n\nVocê perdeu! 💀',
                '🎰 *CLIQUE* 💨... Você sobreviveu! 🎉',
                '🎰 *CLIQUE* *CLIQUE* 😰... A sorte está com você! ✨'
            ];

            const result = chance > 0.5 ? 
                messages[1] : // Sobrevive, ganha XP
                messages[0];

            await message.reply(result);

            // Se sobreviveu, ganha bônus de XP
            if (chance > 0.5) {
                const xpResult = await XPSystem.addXP(
                    message.from,
                    context.userName,
                    config.xp.perCommand + 50 // Bônus
                );

                if (xpResult.levelUp) {
                    await message.reply(
                        `⭐ LEVEL UP! Novo nível: ${xpResult.level}`
                    );
                }
            }

            return true;

        } catch (error) {
            logger.error('Erro em roleta', error);
            await message.reply('❌ Erro ao processar comando');
            return false;
        }
    }
});
```

## 🚀 Best Practices

1. **Sempre validar entrada** - Use `Validator`
2. **Sempre logar** - Use `logger`
3. **Sempre tratar erros** - Use try/catch
4. **Sempre respeitar rate limit** - Verifique antes de executar
5. **Sempre dar feedback** - Responda ao usuário
6. **Sempre sanitizar dados** - Use `Validator.sanitize()`
7. **Sempre documentar** - Inclua comentários JSDoc

## 📞 Suporte

Para dúvidas ou problemas:

1. Consulte a documentação do [whatsapp-web.js](https://wwebjs.dev/)
2. Abra uma Issue no repositório
3. Contacte o desenvolvedor

---

**Última atualização: 2024**
