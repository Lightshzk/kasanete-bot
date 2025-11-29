<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&height=200&color=gradient&customColorList=12,17,20&text=Kasane%20Teto%20Bot&fontSize=80&fontColor=FF91D8&animation=fadeIn&desc=WhatsApp%20Bot%20with%20Personality%20%E2%9C%A8&descAlignY=65" />

<img width="300" height="300" alt="Kasane Teto" src="https://github.com/user-attachments/assets/a846a668-9956-415d-b686-4dbcd90c952a" />

# 🎤 Kasane Teto Bot

### *Um bot do WhatsApp com toda a personalidade da Kasane Teto!*

[![Node.js Version](https://img.shields.io/badge/Node.js-16.x+-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Web.js-25D366?style=for-the-badge&logo=whatsapp)](https://wwebjs.dev/)
[![License](https://img.shields.io/badge/License-MIT-FF91D8?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-00FF7F?style=for-the-badge)]()

[📖 Documentação](#-instalação) • [🎮 Comandos](#-comandos-disponíveis) • [⚙️ Configuração](#%EF%B8%8F-configuração-avançada) • [🤝 Contribuir](#-contribuições)

</div>

---

## ✨ Características Principais

<table>
<tr>
<td width="50%">

### 🎵 Recursos de Mídia
- 🎶 Download de músicas do YouTube
- 🖼️ Criador de stickers personalizados
- 🔄 Conversão sticker ↔ imagem
- 📹 Suporte para vídeos e GIFs

</td>
<td width="50%">

### 🎮 Sistema de Gamificação
- 📈 Sistema de XP e níveis dinâmico
- 🏆 Leaderboard competitivo
- 🎯 Conquistas e recompensas
- ⚡ Cooldowns inteligentes

</td>
</tr>
<tr>
<td width="50%">

### 🎌 Conteúdo Anime
- 🖼️ Fotos de anime aleatórias
- 😺 Neko, kitsune e mais
- 🎨 Conteúdo curado de alta qualidade
- 🔞 Seção NSFW (18+) opcional

</td>
<td width="50%">

### 🛡️ Segurança & Performance
- 🚫 Anti-spam e rate limiting
- 📊 Sistema de logs completo
- ⚙️ Altamente configurável
- 🔧 Arquitetura modular

</td>
</tr>
</table>

---

## 📋 Requisitos

Antes de começar, certifique-se de ter instalado:

| Requisito | Versão Mínima | Download |
|-----------|---------------|----------|
| **Node.js** | 16.0.0+ | [nodejs.org](https://nodejs.org/) |
| **npm** | 8.0.0+ | *Incluído com Node.js* |
| **Python** | 3.8+ | [python.org](https://python.org/) |
| **WhatsApp** | Ativo | *No seu celular* |

---

## 🚀 Instalação

### Passo 1️⃣: Clone o repositório

```bash
git clone https://github.com/Lightshzk/kasane-bot.git
cd kasane-bot
```

### Passo 2️⃣: Instale as dependências

```bash
npm install
```

> 💡 **Dica**: Use `npm ci` para instalação mais rápida em produção

### Passo 3️⃣: Configure o ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas preferências:

```env
# ═══════════════════════════════════════
# CONFIGURAÇÕES BÁSICAS
# ═══════════════════════════════════════
COMMAND_PREFIX=!
OWNER_NAME=Lightshzk
OWNER_NUMBER=5511999999999

# ═══════════════════════════════════════
# SISTEMA DE XP
# ═══════════════════════════════════════
XP_PER_MESSAGE=8
XP_PER_COMMAND=15
LEVEL_MULTIPLIER=100

# ═══════════════════════════════════════
# PROTEÇÃO ANTI-SPAM
# ═══════════════════════════════════════
RATE_LIMIT_MESSAGES=10
RATE_LIMIT_WINDOW=60000

# ═══════════════════════════════════════
# DEBUG & LOGS
# ═══════════════════════════════════════
DEBUG_MODE=false
LOG_LEVEL=info
```

### Passo 4️⃣: Inicie o bot

```bash
npm start
```

<div align="center">

**📱 Escaneie o QR Code com o WhatsApp e pronto!**

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=FF91D8&center=true&vCenter=true&width=435&lines=Bot+conectado+com+sucesso!+%E2%9C%A8;Kasane+Teto+está+online!+%F0%9F%8E%A4" />

</div>

---

## 🎮 Comandos Disponíveis

### 📚 Comandos Gerais

<details>
<summary><b>Clique para expandir</b></summary>

| Comando | Descrição | Aliases | Exemplo |
|---------|-----------|---------|---------|
| `!menu` | Menu interativo de comandos | `!ajuda`, `!help` | `!menu` |
| `!ping` | Latência e uptime do bot | `!latencia`, `!status` | `!ping` |
| `!sobre` | Informações sobre o bot | `!info`, `!about` | `!sobre` |
| `!perfil` | Seu perfil e estatísticas | `!profile`, `!level` | `!perfil` |
| `!rank` | Top 10 usuários | `!leaderboard`, `!top` | `!rank` |

</details>

### 🎵 Comandos de Mídia

<details>
<summary><b>Clique para expandir</b></summary>

| Comando | Descrição | Uso | Cooldown |
|---------|-----------|-----|----------|
| `!play <música>` | Baixa música do YouTube | `!play never gonna give you up` | 30s |
| `!sticker` | Cria sticker de imagem/vídeo | *Responda uma mídia* | 5s |
| `!toimg` | Converte sticker em imagem | *Responda um sticker* | 5s |
| `!tts <texto>` | Text-to-speech | `!tts Olá mundo` | 10s |

</details>

### 🎌 Comandos de Anime

<details>
<summary><b>Clique para expandir</b></summary>

| Comando | Descrição | Categoria | NSFW |
|---------|-----------|-----------|------|
| `!fotoanime` | Foto de anime aleatória | Anime | ❌ |
| `!neko` | Foto de neko fofa | Neko | ❌ |
| `!kitsune` | Foto de kitsune | Kitsune | ❌ |
| `!waifu` | Waifu aleatória | Waifu | ❌ |
| `!nsfwpic` | Conteúdo NSFW (18+) | NSFW | ✅ |
| `!foto` | Foto fofa aleatória | Geral | ❌ |

> ⚠️ **Aviso**: Comandos NSFW só funcionam em grupos/chats privados autorizados

</details>

### 👥 Comandos Sociais

<details>
<summary><b>Clique para expandir</b></summary>

| Comando | Descrição | Aliases |
|---------|-----------|---------|
| `!grupooficial` | Link do grupo oficial | `!grupo`, `!link` |
| `!boanoite` | Mensagem de boa noite | `!boa-noite` |
| `!boatarde` | Mensagem de boa tarde | `!boa-tarde` |
| `!bomdia` | Mensagem de bom dia | `!bom-dia` |

</details>

### 👑 Comandos de Admin (Apenas Dono)

<details>
<summary><b>Clique para expandir</b></summary>

| Comando | Descrição | Uso |
|---------|-----------|-----|
| `!broadcast <msg>` | Enviar mensagem para todos | `!broadcast Olá a todos!` |
| `!addxp @user <xp>` | Adicionar XP a um usuário | `!addxp @user 100` |
| `!ban @user` | Banir usuário do bot | `!ban @user` |
| `!unban @user` | Desbanir usuário | `!unban @user` |
| `!stats` | Estatísticas completas | `!stats` |

</details>

---

## ⚙️ Configuração Avançada

### 📁 Estrutura do Projeto

```
kasane-teto-bot/
│
├── 📄 teto.js                    # Arquivo principal do bot
├── 📄 package.json               # Dependências e scripts
├── 📄 .env                       # Variáveis de ambiente (não versionar!)
├── 📄 .env.example               # Exemplo de configuração
│
├── 📂 comandos/                  # Sistema de comandos
│   ├── index.js                  # Gerenciador de comandos
│   ├── menu.js                   # Menu principal
│   ├── play.js                   # Comando de música
│   ├── perfil.js                 # Sistema de perfil
│   └── ...                       # Outros comandos
│
├── 📂 config/                    # Configurações
│   ├── environment.js            # Variáveis de ambiente
│   ├── settings.js               # Configurações gerais
│   └── dono.js                   # Configurações do dono
│
├── 📂 utils/                     # Utilitários
│   ├── validator.js              # Validação de entrada
│   ├── ratelimiter.js            # Sistema anti-spam
│   ├── logger.js                 # Sistema de logs
│   ├── commandmanager.js         # Gerenciador de comandos
│   ├── xp.js                     # Sistema de XP
│   └── database.js               # Banco de dados
│
├── 📂 database/                  # Dados persistentes
│   ├── users.json                # Dados dos usuários
│   ├── groups.json               # Dados dos grupos
│   └── stats.json                # Estatísticas globais
│
├── 📂 logs/                      # Arquivos de log
│   ├── general-YYYY-MM-DD.log
│   ├── errors-YYYY-MM-DD.log
│   └── commands-YYYY-MM-DD.log
│
└── 📂 assets/                    # Recursos
    ├── images/                   # Imagens
    ├── audio/                    # Áudios
    └── temp/                     # Arquivos temporários
```

### 🔧 Variáveis de Ambiente Completas

```env
# ═══════════════════════════════════════════════════════════
# KASANE TETO BOT - CONFIGURAÇÃO COMPLETA
# ═══════════════════════════════════════════════════════════

# ───────────────────────────────────────
# CONFIGURAÇÕES BÁSICAS
# ───────────────────────────────────────
COMMAND_PREFIX=!
BOT_NAME=Kasane Teto
OWNER_NAME=Lightshzk
OWNER_NUMBER=5511999999999
SUPPORT_GROUP=https://chat.whatsapp.com/seu-grupo

# ───────────────────────────────────────
# SISTEMA DE XP E NÍVEIS
# ───────────────────────────────────────
XP_PER_MESSAGE=8          # XP por mensagem enviada
XP_PER_COMMAND=15         # XP por comando usado
LEVEL_MULTIPLIER=100      # Multiplicador de nível
XP_COOLDOWN=10000         # Cooldown de XP (ms)
MAX_LEVEL=100             # Nível máximo

# ───────────────────────────────────────
# RATE LIMITING & ANTI-SPAM
# ───────────────────────────────────────
RATE_LIMIT_MESSAGES=10    # Máx. mensagens por janela
RATE_LIMIT_WINDOW=60000   # Janela de tempo (ms)
SPAM_THRESHOLD=5          # Limite para considerar spam
SPAM_BAN_DURATION=300000  # Duração do ban (ms)

# ───────────────────────────────────────
# RECURSOS & FUNCIONALIDADES
# ───────────────────────────────────────
ENABLE_MUSIC=true         # Habilitar comandos de música
ENABLE_NSFW=false         # Habilitar comandos NSFW
ENABLE_GROUPS=true        # Permitir uso em grupos
ENABLE_AUTO_REPLY=true    # Respostas automáticas
MAX_DOWNLOAD_SIZE=50      # Tamanho máx. download (MB)

# ───────────────────────────────────────
# LOGS & DEBUG
# ───────────────────────────────────────
DEBUG_MODE=false
LOG_LEVEL=info            # debug, info, warn, error
LOG_TO_FILE=true
LOG_TO_CONSOLE=true
LOG_ROTATION=daily        # daily, weekly, monthly

# ───────────────────────────────────────
# APIs EXTERNAS (Opcional)
# ───────────────────────────────────────
# OPENAI_API_KEY=sua-chave-aqui
# GOOGLE_API_KEY=sua-chave-aqui
# ANIME_API_KEY=sua-chave-aqui

# ───────────────────────────────────────
# BANCO DE DADOS
# ───────────────────────────────────────
DB_TYPE=json              # json, mongodb, sqlite
# MONGODB_URI=mongodb://localhost:27017/kasanebot
# SQLITE_PATH=./database/kasane.db

# ───────────────────────────────────────
# PERFORMANCE
# ───────────────────────────────────────
MAX_CONCURRENT_COMMANDS=5
COMMAND_TIMEOUT=30000
CACHE_DURATION=3600000
AUTO_RESTART=true
```

---

## 📊 Sistema de XP e Níveis

### Como Funciona?

```
┌─────────────────────────────────────────┐
│  GANHE XP DE VÁRIAS FORMAS:             │
├─────────────────────────────────────────┤
│  💬 Enviar mensagens      → +8 XP       │
│  🎮 Usar comandos         → +15 XP      │
│  🏆 Completar conquistas  → +50-200 XP  │
│  🎁 Bônus diário          → +100 XP     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  FÓRMULA DE NÍVEL:                      │
│  XP necessário = nível × 100            │
│                                         │
│  Nível 1  →  100 XP                     │
│  Nível 2  →  200 XP                     │
│  Nível 10 → 1000 XP                     │
└─────────────────────────────────────────┘
```

### Recompensas por Nível

| Nível | Recompensa | Desbloqueio |
|-------|------------|-------------|
| 5 | 🎨 Título "Iniciante" | Comandos básicos |
| 10 | 🌟 Título "Ativo" | Comandos intermediários |
| 25 | 💎 Título "Experiente" | Comandos avançados |
| 50 | 👑 Título "Veterano" | Comandos especiais |
| 100 | 🏆 Título "Lenda" | Todos os recursos |

---

## 🛡️ Segurança e Proteções

<table>
<tr>
<td width="50%">

### ✅ Implementado
- Validação de entrada de usuário
- Rate limiting por usuário
- Sistema anti-spam inteligente
- Proteção contra injection
- Sanitização de dados
- Logs de segurança
- Lista de banidos
- Cooldowns de comandos

</td>
<td width="50%">

### 🔒 Boas Práticas
- Nunca commite o arquivo `.env`
- Use variáveis de ambiente
- Mantenha dependências atualizadas
- Revise logs regularmente
- Limite permissões de admin
- Faça backups do banco de dados
- Monitore uso de recursos
- Implemente rate limiting

</td>
</tr>
</table>

---

## 🎨 Desenvolvendo Novos Comandos

### Template Básico

```javascript
commandManager.register({
    // Informações básicas
    name: 'meucomando',
    description: 'Descrição clara do que o comando faz',
    category: 'Geral',
    
    // Aliases (opcional)
    aliases: ['alias1', 'alias2'],
    
    // Validações
    minArgs: 0,
    maxArgs: 5,
    usage: '!meucomando [argumento]',
    examples: ['!meucomando', '!meucomando teste'],
    
    // Configurações
    cooldown: 5,           // Cooldown em segundos
    ownerOnly: false,      // Apenas dono pode usar
    groupOnly: false,      // Apenas em grupos
    privateOnly: false,    // Apenas em privado
    nsfw: false,          // Comando NSFW
    
    // Execução
    execute: async (message, args) => {
        try {
            // Sua lógica aqui
            await message.reply('✅ Comando executado!');
            return true;
        } catch (error) {
            console.error('Erro:', error);
            await message.reply('❌ Erro ao executar comando');
            return false;
        }
    }
});
```

### Exemplo Avançado

```javascript
commandManager.register({
    name: 'dado',
    description: 'Rola um dado de 6 lados',
    category: 'Diversão',
    aliases: ['roll', 'dice'],
    minArgs: 0,
    maxArgs: 1,
    cooldown: 3,
    usage: '!dado [lados]',
    examples: ['!dado', '!dado 20'],
    
    execute: async (message, args) => {
        // Número de lados (padrão: 6)
        const lados = parseInt(args[0]) || 6;
        
        // Validação
        if (lados < 2 || lados > 100) {
            return message.reply('❌ Use entre 2 e 100 lados!');
        }
        
        // Rolar dado
        const resultado = Math.floor(Math.random() * lados) + 1;
        
        // Responder
        await message.reply(
            `🎲 Você rolou um dado de ${lados} lados!\n` +
            `🎯 Resultado: **${resultado}**`
        );
        
        return true;
    }
});
```

---

## 📝 Sistema de Logs

### Tipos de Logs

| Arquivo | Conteúdo | Retenção |
|---------|----------|----------|
| `general-*.log` | Atividades gerais | 7 dias |
| `errors-*.log` | Erros e exceções | 30 dias |
| `commands-*.log` | Comandos executados | 7 dias |
| `xp-*.log` | Eventos de XP | 7 dias |
| `connection-*.log` | Status de conexão | 3 dias |
| `security-*.log` | Eventos de segurança | 30 dias |

### Formato de Log

```
[2025-01-15 14:30:45] [INFO] Comando 'menu' executado por +5511999999999
[2025-01-15 14:31:02] [WARN] Rate limit atingido para +5511888888888
[2025-01-15 14:31:15] [ERROR] Falha ao processar comando 'play': Timeout
```

---

## 🐛 Resolução de Problemas

<details>
<summary><b>❌ Bot não conecta ao WhatsApp</b></summary>

**Soluções:**
1. Verifique se o WhatsApp está ativo no celular
2. Delete a pasta `.wwebjs_auth` e reconecte
3. Reinicie o bot com `npm start`
4. Verifique os logs em `./logs/connection-*.log`
5. Certifique-se de que não há outro bot conectado

</details>

<details>
<summary><b>❌ Comandos não funcionam</b></summary>

**Soluções:**
1. Verifique o prefixo no arquivo `.env`
2. Confira a sintaxe: `!comando argumentos`
3. Use `!menu` para ver comandos disponíveis
4. Verifique logs de erro: `./logs/errors-*.log`
5. Certifique-se de ter permissões necessárias

</details>

<details>
<summary><b>❌ Erro ao baixar músicas</b></summary>

**Soluções:**
1. Verifique sua conexão de internet
2. Confirme que o link do YouTube é válido
3. Verifique o limite de tamanho em `.env`
4. Limpe a pasta `./assets/temp/`
5. Reinstale dependências: `npm install`

</details>

<details>
<summary><b>❌ Rate limit muito ativo</b></summary>

**Soluções:**
1. Ajuste `RATE_LIMIT_MESSAGES` no `.env`
2. Aumente `RATE_LIMIT_WINDOW` para janela maior
3. Reduza `SPAM_THRESHOLD` se necessário
4. Desabilite temporariamente para testes (não recomendado)

</details>

<details>
<summary><b>❌ Alto consumo de memória</b></summary>

**Soluções:**
1. Reduza `MAX_CONCURRENT_COMMANDS`
2. Diminua `CACHE_DURATION`
3. Limpe arquivos temporários regularmente
4. Use `pm2` para gerenciar memória
5. Considere usar banco de dados externo

</details>

---

## 🚀 Deploy e Produção

### Usando PM2 (Recomendado)

```bash
# Instalar PM2
npm install -g pm2

# Iniciar bot
pm2 start teto.js --name kasane-teto

# Ver logs
pm2 logs kasane-teto

# Reiniciar
pm2 restart kasane-teto

# Parar
pm2 stop kasane-teto

# Auto-start no boot
pm2 startup
pm2 save
```

### Docker (Opcional)

```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY . .

CMD ["npm", "start"]
```

```bash
# Build
docker build -t kasane-teto-bot .

# Run
docker run -d --name teto-bot kasane-teto-bot
```

---

## 📚 Recursos e Referências

### Documentação Oficial

- 📖 [WhatsApp Web.js](https://wwebjs.dev/) - Biblioteca principal
- 📖 [Node.js](https://nodejs.org/docs/) - Runtime JavaScript
- 📖 [Play-DL](https://github.com/play-dl/play-dl) - Download de músicas

### APIs Úteis

- 🎨 [Nekos.life](https://nekos.life/) - Imagens de anime
- 🎵 [YouTube API](https://developers.google.com/youtube) - Informações de vídeos
- 🤖 [OpenAI API](https://openai.com/api/) - IA conversacional

### Comunidade

- 💬 [Grupo do WhatsApp](https://chat.whatsapp.com/seu-grupo) - Suporte oficial
- 🐛 [Issues no GitHub](https://github.com/Lightshzk/kasane-bot/issues) - Reportar bugs
- 💡 [Discussions](https://github.com/Lightshzk/kasane-bot/discussions) - Ideias e sugestões

---

## 👨‍💻 Desenvolvedor

<div align="center">

### **Lightshzk**

*Desenvolvedor Principal & Criador*

[![GitHub](https://img.shields.io/badge/GitHub-Lightshzk-181717?style=for-the-badge&logo=github)](https://github.com/Lightshzk)
[![Discord](https://img.shields.io/badge/Discord-Lightshzk-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/seu-servidor)

</div>

---

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT** - veja o arquivo [LICENSE](LICENSE) para detalhes.

```
MIT License

Copyright (c) 2025 Lightshzk

É concedida permissão, gratuitamente, a qualquer pessoa que obtenha uma cópia
deste software e arquivos de documentação associados (o "Software"), para lidar
com o Software sem restrições...
```

---

## 🤝 Contribuições

Contribuições são sempre bem-vindas! Aqui está como você pode ajudar:

### Como Contribuir

1. 🍴 Faça um Fork do projeto
2. 🌿 Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. ✏️ Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. 📤 Push para a branch (`git push origin feature/MinhaFeature`)
5. 🔀 Abra um Pull Request

### Diretrizes

- ✅ Siga o estilo de código existente
- ✅ Adicione testes para novas features
- ✅ Atualize a documentação
- ✅ Descreva suas mudanças claramente
- ✅ Seja respeitoso com outros contribuidores

---

## 🌟 Agradecimentos Especiais

- 🎤 **Kasane Teto** - A inspiração por trás do bot
- 💻 **WhatsApp Web.js Team** - Pela biblioteca incrível
- 🎨 **Comunidade Open Source** - Pelo suporte e contribuições
- 💖 **Você** - Por usar e apoiar o projeto!

---

## 📞 Suporte

Precisa de ajuda? Entre em contato:

<div align="center">

| Canal | Link |
|-------|------|
| 📱 **WhatsApp** | [Grupo Oficial](https://chat.whatsapp.com/seu-grupo) |
| 💬 **Discord** | [Servidor do Bot](https://discord.gg/seu-servidor) |
| 🐛 **Issues** | [GitHub Issues](https://github.com/Lightshzk/kasane-bot/issues) |
| 📧 **Email** | suporte@kasanebot.com |

</div>

---

## 📊 Estatísticas do Projeto

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/Lightshzk/kasane-bot?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/Lightshzk/kasane-bot?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/Lightshzk/kasane-bot?style=for-the-badge)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Lightshzk/kasane-bot?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/Lightshzk/kasane-bot?style=for-the-badge)

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&height=150&color=gradient&customColorList=12,17,20&section=footer" />

### 💖 Feito com muito carinho para Kasane Teto

🎤 *"Arigatou gozaimasu! ~Teto"* ✨

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=FF91D8&center=true&vCenter=true&width=435&lines=Kasane+Teto+Bot+%E2%9C%A8;Sempre+aqui+para+voc%C3%AA!+%F0%9F%8E%A4;Divirta-se!+%F0%9F%8E%B5" />

⭐ **Se este projeto te ajudou, deixe uma estrela!** ⭐

</div>
