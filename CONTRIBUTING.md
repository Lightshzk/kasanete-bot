# 🤝 Guia de Contribuição

Obrigado por considerar contribuir para o **Kasane Teto Bot**! Este guia fornecerá orientações sobre como participar.

## 📋 Código de Conduta

Este projeto se compromete a fornecer um ambiente acolhedor para todos. Esperamos que todos os contribuidores respeitem:

- Ser respeitoso e construtivo
- Não fazer comentários ofensivos ou discriminatórios
- Focar no código, não na pessoa

## 🐛 Reportando Bugs

Antes de criar um relatório de bug, procure no histórico de issues - o bug pode já ter sido reportado.

**Como relatar um bug:**

1. **Use um título descritivo**
2. **Descreva os passos exatos** para reproduzir o problema
3. **Forneça exemplos específicos** para demonstrar os passos
4. **Descreva o comportamento observado** e **o que você esperava ver**
5. **Inclua screenshots/logs** se possível
6. **Mencione seu ambiente**: Windows/Linux/Mac, Node version, etc.

Exemplo:

```
Título: [BUG] Comando !play falha com URLs do YouTube Shorts

Passos para reproduzir:
1. Use o comando !play <url do YouTube Shorts>
2. Observe a resposta

Comportamento esperado:
Música deve ser baixada e enviada

Comportamento atual:
Erro: "URL inválida"

Ambiente:
- Windows 11
- Node.js 18.0.0
```

## 💡 Sugerindo Melhorias

**Como sugerir uma melhoria:**

1. **Use um título descritivo e claro**
2. **Forneça uma descrição detalhada** da melhoria sugerida
3. **Liste exemplos concretos** mostrando como a melhoria funcionaria
4. **Explique por que** esta melhoria seria útil

## 🎨 Pull Requests

Siga esses passos para contribuir com código:

### 1. Fork e Configure o Ambiente

```bash
# Fork o repositório no GitHub
git clone https://github.com/SEU_USUARIO/kasane-bot.git
cd kasane-bot

# Adicione o repositório original como upstream
git remote add upstream https://github.com/Lightshzk/kasane-bot.git

# Instale dependências
npm install
```

### 2. Crie uma Branch

```bash
git checkout -b feature/sua-feature
# ou para bug fixes:
git checkout -b fix/seu-bug-fix
```

### 3. Faça suas Mudanças

Siga o estilo de código existente:

```javascript
// ✅ Bom
const userName = message._data?.notifyName || 'Usuário';
const result = await processCommand(message, args);

// ❌ Evite
var userName = (message._data && message._data.notifyName) || 'Usuário';
let result = processCommand(message, args);
```

### 4. Teste suas Mudanças

```bash
npm run dev
# Teste manualmente com o WhatsApp
```

### 5. Commite suas Mudanças

Use mensagens de commit descritivas:

```bash
git add .
git commit -m "feature: adicionar comando !tetosay para Teto repetir mensagens"
# ou
git commit -m "fix: corrigir erro de rate limiting em DMs"
```

### 6. Push e Envie um PR

```bash
git push origin feature/sua-feature
```

Depois, crie um Pull Request no GitHub com:

- **Descrição clara** do que foi feito
- **Links para issues relacionadas** (se houver)
- **Screenshots/logs** de testes
- **Checklist** de itens completados

## 📝 Padrões de Código

### Nomeação

```javascript
// Variáveis e funções: camelCase
const userName = 'Teto';
function getUserXP() { }

// Constantes: UPPER_SNAKE_CASE
const MAX_MESSAGE_LENGTH = 500;

// Classes: PascalCase
class CommandManager { }
```

### Comentários e Documentação

```javascript
/**
 * Descrição breve da função
 * 
 * @param {type} parameter - Descrição do parâmetro
 * @returns {type} Descrição do retorno
 */
function myFunction(parameter) {
    // Comentário explicativo se necessário
    return result;
}
```

### Tratamento de Erros

```javascript
try {
    // Seu código
} catch (error) {
    logger.error('Contexto do erro', error);
    await message.reply('❌ Mensagem de erro amigável');
}
```

## 📚 Adicionando Novos Comandos

Ao adicionar novos comandos, siga este template:

```javascript
commandManager.register({
    name: 'seucomando',
    description: 'Descrição clara do que faz',
    category: 'Categoria',
    aliases: ['alias1', 'alias2'],
    minArgs: 0,
    maxArgs: 10,
    cooldown: 5,
    examples: ['seucomando argumento', 'seucomando --flag'],
    execute: async (message, args) => {
        try {
            // Validar entrada
            const validation = Validator.validateArgs(args, minArgs, maxArgs);
            if (!validation.valid) {
                await message.reply(validation.error);
                return false;
            }

            // Sua lógica aqui
            await message.reply('Resposta!');
            return true;
        } catch (error) {
            logger.error('Erro em seucomando', error);
            await message.reply('❌ Erro ao executar comando');
            return false;
        }
    }
});
```

## 🧪 Testando

Antes de enviar um PR:

```bash
# Verifique se o bot inicia
npm start

# Teste todos os comandos manualmente
# Procure por erros nos logs

# Teste em grupos e DMs
# Teste rate limiting
# Teste com diferentes tipos de mídia
```

## 📚 Estrutura de Arquivos

Mantenha a estrutura organizada:

```
comandos/
  ├── seu-novo-comando.js    # Arquivo do comando
  └── index.js               # Exporte em index.js

utils/
  ├── sua-util.js            # Nova utilidade
  
config/
  ├── sua-config.js          # Configuração específica
```

## 🔄 Processo de Revisão

1. **Um desenvolvedor revisará seu PR**
2. **Mudanças podem ser solicitadas**
3. **Após aprovação, seu PR será mergeado**
4. **Seu nome aparecerá em CONTRIBUTORS**

## 🎯 Áreas que Precisam de Ajuda

- ✅ Novos comandos temáticos
- ✅ Melhorias de performance
- ✅ Novas APIs de imagens/música
- ✅ Tradução para outros idiomas
- ✅ Testes e documentação
- ✅ Correção de bugs

## 📞 Dúvidas?

- Abra uma **Issue de Discussão**
- Envie uma **Discussão** no repositório
- Contate o desenvolvedor principal

## ✨ Obrigado!

Sua contribuição é valiosa e ajuda a tornar o Kasane Teto Bot ainda melhor para a comunidade! 🎤💖

---

**Kasane Teto Bot Team**
