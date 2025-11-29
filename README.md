 🎤 Kasane Teto Bot
<img width="1920" height="1600" alt="image" src="https://github.com/user-attachments/assets/a846a668-9956-415d-b686-4dbcd90c952a" />

Um bot do WhatsApp temático de **Kasane Teto** com comandos divertidos, sistema de XP, múltiplos recursos de mídia e muita personalidade!

## ✨ Características Principais

- 🎵 **Sistema de Música** - Baixar músicas do YouTube com `!play`
- 🎨 **Criador de Stickers** - Transformar imagens em stickers
- 🎌 **Conteúdo Anime** - Fotos de anime, neko, kitsune e mais
- 📈 **Sistema de XP e Níveis** - Ganha XP conversando e usando comandos
- 🛡️ **Anti-Spam** - Proteção contra abuso e flood
- 📊 **Leaderboard** - Veja ranking de usuários mais ativos
- 🎯 **Sistema de Comandos Modular** - Fácil de estender
- 📝 **Logging Completo** - Registra todas as atividades
- 🔧 **Altamente Configurável** - Use arquivo `.env`

## 📋 Requisitos

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0
- **WhatsApp** ativo no seu telefone
- **Python 3.8+** (para canvas/imagens)

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/Lightshzk/kasane-bot.git
cd kasane-bot
```

### 2. Instale dependências

```bash
npm install
```

### 3. Configure variáveis de ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
COMMAND_PREFIX=!
OWNER_NAME=Lightshzk
OWNER_NUMBER=5511999999999
XP_PER_MESSAGE=8
RATE_LIMIT_MESSAGES=10
DEBUG_MODE=false
```

### 4. Inicie o bot

```bash
npm start
```

Escaneie o QR Code com o WhatsApp e está pronto!

## 📱 Usando em Modo Desenvolvimento

```bash
npm run dev
```

O bot reiniciará automaticamente quando houver mudanças no código.

## 🎮 Comandos Disponíveis

### 📚 Geral

| Comando | Descrição | Aliases |
|---------|-----------|---------|
| `!menu` | Mostrar menu de comandos | `!ajuda`, `!help` |
| `!ping` | Ver latência e uptime | `!latência`, `!status` |
| `!sobre` | Info sobre o bot | `!info`, `!about` |
| `!perfil` | Seu perfil e nível | `!profile`, `!level` |

### 🎵 Mídia & Música

| Comando | Descrição |
|---------|-----------|
| `!play <música>` | Baixar música do YouTube |
| `!sticker` | Converter imagem em sticker |
| `!toimg` | Converter sticker em imagem |

### 🎌 Anime & Divertimento

| Comando | Descrição | Aliases |
|---------|-----------|---------|
| `!fotoanime` | Foto de anime aleatória | `!anime` |
| `!neko` | Foto de neko fofa | - |
| `!kitsune` | Foto de kitsune | - |
| `!nsfwpic` | Conteúdo NSFW (18+) | - |
| `!foto` | Foto fofa aleatória | - |

### 👥 Social

| Comando | Descrição | Aliases |
|---------|-----------|---------|
| `!grupooficial` | Link do grupo oficial | `!grupo`, `!link` |
| `!boanoite` | Mensagem de boa noite | `!boa-noite` |

## ⚙️ Configuração Avançada

### Arquivo `.env`

```env
# Prefixo de comandos
COMMAND_PREFIX=!

# Informações do dono
OWNER_NAME=Lightshzk
OWNER_NUMBER=5511999999999

# Sistema de XP
XP_PER_MESSAGE=8
XP_PER_COMMAND=15
LEVEL_MULTIPLIER=100

# Rate Limiting
RATE_LIMIT_MESSAGES=10
RATE_LIMIT_WINDOW=60000

# Debug
DEBUG_MODE=false
LOG_LEVEL=info
```

### Estrutura de Pastas

```
kasanete/
├── teto.js                 # Arquivo principal
├── .env                    # Variáveis de ambiente
├── package.json
├── comandos/               # Todos os comandos
│   ├── index.js
│   ├── menu.js
│   ├── play.js
│   └── ...
├── config/                 # Configurações
│   ├── environment.js
│   ├── settings.js
│   └── dono.js
├── utils/                  # Utilitários
│   ├── validator.js        # Validação de entrada
│   ├── ratelimiter.js      # Anti-spam
│   ├── logger.js           # Sistema de logs
│   ├── commandmanager.js   # Gerenciador de comandos
│   ├── xp.js               # Sistema de XP
│   └── database.js
├── database/               # Banco de dados
├── logs/                   # Arquivos de log
└── assets/                 # Imagens e mídias
```

## 🛡️ Segurança

- ✅ **Validação de Entrada** - Todas as entradas são validadas
- ✅ **Rate Limiting** - Protege contra spam e flood
- ✅ **Variáveis de Ambiente** - Nenhuma credencial no código
- ✅ **Logging de Atividades** - Rastreia todas as ações
- ✅ **Tratamento de Erros** - Erros são capturados e registrados

## 📊 Sistema de XP

- Ganhe XP conversando (8 XP por mensagem)
- Ganhe mais XP usando comandos (15 XP)
- Sistema de níveis com progressão realista
- Verificação automática de level up
- Leaderboard para competição saudável

## 🔧 Desenvolvendo Novos Comandos

Adicione novos comandos em `teto.js`:

```javascript
commandManager.register({
    name: 'seucomando',
    description: 'Descrição do seu comando',
    category: 'Categoria',
    aliases: ['alias1', 'alias2'],
    minArgs: 0,
    maxArgs: 5,
    cooldown: 5,
    execute: async (message, args) => {
        // Sua lógica aqui
        await message.reply('Resposta!');
        return true;
    }
});
```

## 📝 Logs

Os logs são salvos automaticamente em `./logs/`:

- `general-YYYY-MM-DD.log` - Atividades gerais
- `errors-YYYY-MM-DD.log` - Erros
- `commands-YYYY-MM-DD.log` - Comandos executados
- `xp-YYYY-MM-DD.log` - Eventos de XP
- `connection-YYYY-MM-DD.log` - Status de conexão

## 🐛 Resolução de Problemas

### Bot não conecta

1. Verifique se o WhatsApp está aberto e ativo
2. Delete a pasta `.wwebjs_auth` e tente novamente
3. Verifique os logs em `./logs/`

### Erro ao usar comandos

1. Verifique a sintaxe do comando
2. Use `!menu` para ver todos os comandos
3. Verifique os logs de erro

### Rate limit ativado

O bot protege contra spam. Aguarde alguns segundos entre mensagens rápidas.

## 📚 Referências

- [WhatsApp Web.js](https://wwebjs.dev/)
- [Node.js](https://nodejs.org/)
- [Play-DL](https://github.com/play-dl/play-dl)

## 👨‍💻 Desenvolvedor

**Lightshzk** - Desenvolvedor Principal

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo LICENSE para detalhes.

## 🤝 Contribuições

Contribuições são bem-vindas! Abra uma issue ou pull request.

## 📞 Suporte

- GitHub: [Lightshzk/kasane-bot](https://github.com/Lightshzk/kasane-bot)
- WhatsApp: Grupo oficial do bot

---

<div align="center">

**Feito com 💖 para Kasane Teto**

🎤 *Kasane Teto Bot - Sempre aqui para você!* ✨

</div>" 
