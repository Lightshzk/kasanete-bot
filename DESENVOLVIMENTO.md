# 💡 Guia de Desenvolvimento e Boas Práticas

## 🎯 Estrutura do Projeto

```
kasanete/
├── teto.js                      # Arquivo principal - NÃO EDITAR FREQUENTEMENTE
│
├── comandos/                    # Todos os comandos do bot
│   ├── index.js                 # Export central
│   ├── menu.js                  # Comando menu
│   ├── exemplo.js               # Exemplo de comando (use como template)
│   └── ...
│
├── config/                      # Configurações
│   ├── environment.js           # Carrega variáveis de ambiente
│   ├── settings.js              # Configurações específicas
│   └── dono.js                  # Dados do dono
│
├── utils/                       # Utilitários reutilizáveis
│   ├── validator.js             # Validação de entrada ✨ NOVO
│   ├── ratelimiter.js           # Anti-spam ✨ NOVO
│   ├── logger.js                # Sistema de logs
│   ├── commandmanager.js        # Gerenciador de comandos ✨ NOVO
│   ├── xp.js                    # Sistema de XP (melhorado)
│   ├── database.js              # Banco de dados
│   └── formatartempo.js         # Formatação de tempo
│
├── database/                    # Banco de dados
│   └── db.js                    # Conexão e queries
│
├── logs/                        # Arquivos de log (gerado automaticamente)
│
├── assets/                      # Imagens e GIFs
│   └── menu.gif
│
├── .env.example                 # Template de variáveis ✨ NOVO
├── .env                         # Variáveis secretas (NÃO COMMITAR)
├── .gitignore                   # O que ignorar no Git
├── package.json
└── README.md
```

## 📝 Padrões de Código

### 1. Variáveis e Funções

```javascript
// ✅ Bom - camelCase
const userName = 'Teto';
const getUserXP = () => { };
let isConnected = true;

// ❌ Ruim
const user_name = 'Teto';
const get_user_xp = () => { };
const ISCONNECTED = true;
```

### 2. Constantes

```javascript
// ✅ Bom - UPPER_SNAKE_CASE
const MAX_MESSAGE_LENGTH = 500;
const DEFAULT_XP_PER_MESSAGE = 8;

// ❌ Ruim
const max_message_length = 500;
const maxMessageLength = 500;
```

### 3. Comentários

```javascript
// ✅ Bom
/**
 * Valida se a string está vazia
 * @param {string} value - Valor a validar
 * @returns {boolean} True se vazio
 */
function isEmpty(value) {
    return value.trim().length === 0;
}

// ❌ Ruim
function isEmpty(value) {
    // verifica se vazio
    return value.trim().length === 0;
}
```

### 4. Tratamento de Erros

```javascript
// ✅ Bom
try {
    const result = await fetchData();
    return result;
} catch (error) {
    logger.error('Erro ao buscar dados', error);
    throw new Error('Falha ao processar');
}

// ❌ Ruim
try {
    const result = await fetchData();
    return result;
} catch (error) {
    console.log('erro'); // Impreciso
}
```

## 🔧 Como Adicionar um Novo Comando

### Passo 1: Criar o Arquivo

Crie `comandos/seu-comando.js`:

```javascript
const Validator = require('../utils/validator');
const Logger = require('../utils/logger');
const logger = new Logger();

exports.seuComando = async (message, args) => {
    try {
        // Validar entrada
        const validation = Validator.validateArgs(args, 1, 5);
        if (!validation.valid) {
            await message.reply(validation.error);
            return;
        }

        // Seu código
        await message.reply('Resposta!');

    } catch (error) {
        logger.error('Erro em seuComando', error);
        await message.reply('❌ Erro ao executar comando');
    }
};
```

### Passo 2: Registrar em `teto.js`

```javascript
commandManager.register({
    name: 'seu-comando',
    description: 'Descrição do comando',
    category: 'Categoria',
    aliases: ['alias1', 'alias2'],
    cooldown: 5,
    execute: async (message, args) => {
        const { seuComando } = require('./comandos/seu-comando');
        await seuComando(message, args);
        return true;
    }
});
```

### Passo 3: Testar

```bash
npm run dev
# Use o comando: !seu-comando
```

## 🔍 Debug e Troubleshooting

### Ativar Debug Mode

```env
DEBUG_MODE=true
LOG_LEVEL=debug
```

### Verificar Logs

```bash
# Último erro
tail -f logs/errors-*.log

# Últimos comandos
tail -f logs/commands-*.log

# Tudo
tail -f logs/general-*.log
```

### Debugar Específico

```javascript
logger.debug('Variável importante', { userId, data });
// Aparecerá em logs/debug-*.log
```

## 🧪 Testando Localmente

### Teste de Comando

```javascript
// Em teto.js, temporariamente:
client.on('ready', () => {
    // Simular mensagem
    const fakeMessage = {
        from: '5511999999999@c.us',
        body: '!seu-comando teste',
        _data: { notifyName: 'TestUser' },
        reply: async (text) => console.log(text)
    };
    
    // Testar
    client.emit('message', fakeMessage);
});
```

### Teste de Rate Limit

```bash
# Enviar muitas mensagens
for i in {1..15}; do sleep 1; done
# Deve ver warnings no console
```

## 📊 Monitoramento

### Verificar Memória

```javascript
setInterval(() => {
    const used = process.memoryUsage();
    console.log('Memory usage:', {
        rss: `${Math.round(used.rss / 1024 / 1024)} MB`,
        heap: `${Math.round(used.heapUsed / 1024 / 1024)} MB`,
        external: `${Math.round(used.external / 1024 / 1024)} MB`
    });
}, 30000); // A cada 30 segundos
```

### Verificar Performance

```javascript
const startTime = Date.now();

// Seu código aqui

const elapsed = Date.now() - startTime;
logger.debug(`Operação levou ${elapsed}ms`);
```

## 🚀 Otimizações

### 1. Cache de Dados

```javascript
// ✅ Bom - Cache com expiração
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

function getCached(key) {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.time < CACHE_TTL) {
        return cached.data;
    }
    return null;
}

function setCached(key, data) {
    cache.set(key, { data, time: Date.now() });
}
```

### 2. Requisições em Paralelo

```javascript
// ✅ Bom - Paralelo
const [user, stats, images] = await Promise.all([
    fetchUser(userId),
    fetchStats(userId),
    fetchImages()
]);

// ❌ Ruim - Sequencial
const user = await fetchUser(userId);
const stats = await fetchStats(userId);
const images = await fetchImages();
```

### 3. Validação Antecipada

```javascript
// ✅ Bom - Validar antes
if (!Validator.validateLength(text, 1, 100)) {
    return;
}
// Processar...

// ❌ Ruim - Validar depois
// Processar...
if (!Validator.validateLength(text, 1, 100)) {
    rollback();
}
```

## 🔐 Segurança

### 1. Sempre Sanitizar

```javascript
// ✅ Bom
const cleanInput = Validator.sanitize(userInput);

// ❌ Ruim
const cleanInput = userInput; // Pode conter XSS
```

### 2. Validar Permissões

```javascript
// ✅ Bom
if (context.ownerId !== message.from) {
    await message.reply('❌ Apenas o dono!');
    return;
}

// ❌ Ruim
// Executar sem verificar
```

### 3. Nunca Expor Dados Sensíveis

```javascript
// ✅ Bom
const config = require('./config/environment');
console.log(config.prefix); // OK

// ❌ Ruim
console.log(process.env.OWNER_NUMBER); // Exposto em logs
```

## 📚 Recursos Úteis

- [Node.js Docs](https://nodejs.org/docs/)
- [WhatsApp Web.js](https://wwebjs.dev/)
- [SQLite3 Node](https://github.com/mapbox/node-sqlite3)
- [Axios](https://axios-http.com/)

## 🎓 Dicas de Aprendizado

### Para Iniciantes
1. Entenda callbacks vs Promises vs async/await
2. Aprenda sobre Events em Node.js
3. Estude o padrão MVC
4. Pratique com comandos simples

### Para Intermediários
1. Implemente cache e otimizações
2. Crie testes unitários
3. Use padrões de design
4. Estude arquitetura de microserviços

### Para Avançados
1. Implemente TypeScript
2. Use Docker para containerização
3. Configure CI/CD
4. Implemente escalabilidade

## 💬 Exemplos de Comandos

### Comando Simples (Info)

```javascript
commandManager.register({
    name: 'hora',
    description: 'Ver hora atual',
    execute: async (message) => {
        const hora = new Date().toLocaleTimeString('pt-BR');
        await message.reply(`🕒 Hora atual: ${hora}`);
        return true;
    }
});
```

### Comando com Argumentos

```javascript
commandManager.register({
    name: 'calculadora',
    description: 'Fazer cálculos simples',
    minArgs: 3,
    maxArgs: 3,
    examples: ['calculadora 5 + 3'],
    execute: async (message, args) => {
        const [num1, operador, num2] = args;
        let resultado;
        
        switch(operador) {
            case '+': resultado = num1 + num2; break;
            case '-': resultado = num1 - num2; break;
            // ...
        }
        
        await message.reply(`📊 ${num1} ${operador} ${num2} = ${resultado}`);
        return true;
    }
});
```

### Comando com Dados do Usuário

```javascript
commandManager.register({
    name: 'minha-data',
    description: 'Sua data de criação de conta',
    execute: async (message, args, context) => {
        const user = await XPSystem.getUserXPInfo(message.from);
        
        if (!user) {
            await message.reply('❌ Usuário não encontrado');
            return false;
        }
        
        await message.reply(`📅 Membro desde: ${user.joinDate}`);
        return true;
    }
});
```

---

**Dicas finais:**

1. **Teste frequentemente** - Antes de commitar
2. **Documente seu código** - Comentários claros
3. **Reutilize código** - Use utils/helpers
4. **Valide sempre** - Entrada é inimiga
5. **Log tudo** - Será seu melhor amigo
6. **Mantenha simples** - KISS (Keep It Simple, Stupid)
7. **Refatore regularmente** - Código limpo é melhor

**Bom desenvolvimento! 🚀**
