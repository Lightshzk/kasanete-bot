#!/usr/bin/env node

/**
 * 🎤 KASANE TETO BOT v2.0
 * Início Rápido - Instale e configure em minutos!
 */

const fs = require('fs');
const path = require('path');

console.clear();
console.log(`
╔════════════════════════════════════════════════════════════════════╗
║                                                                    ║
║            🎤 BEM-VINDO AO KASANE TETO BOT v2.0 🎤               ║
║                                                                    ║
║                     ✨ COMPLETAMENTE REFORMULADO ✨              ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
`);

console.log(`
📚 DOCUMENTAÇÃO DISPONÍVEL:
═════════════════════════════════════════════════════════════════════

✅ QUICKSTART.md               → Comece em 5 MINUTOS
   Como instalar e testar o bot rapidamente

✅ README.md                   → GUIA PRINCIPAL
   Tudo sobre o bot, comandos, requisitos

✅ SUMARIO.md                  → VISÃO GERAL DAS MUDANÇAS
   O que foi adicionado, antes vs depois

✅ MELHORIAS.md                → LISTA COMPLETA DE MELHORIAS
   Todas as features implementadas

✅ DESENVOLVIMENTO.md          → GUIA DO DESENVOLVEDOR
   Como criar novos comandos, boas práticas

✅ COMMAND_API.md              → REFERÊNCIA TÉCNICA
   API completa, exemplos, validadores

✅ CONTRIBUTING.md             → GUIA DE CONTRIBUIÇÃO
   Como contribuir com o projeto

✅ DEPLOYMENT.md               → IMPLANTAÇÃO E MANUTENÇÃO
   Checklist, troubleshooting, cronograma

═════════════════════════════════════════════════════════════════════
`);

console.log(`
🚀 PRÓXIMOS PASSOS:
═════════════════════════════════════════════════════════════════════

1️⃣  INSTALAR DEPENDÊNCIAS
    → npm install

2️⃣  CONFIGURAR BOT
    → cp .env.example .env
    → Editar .env com seu número WhatsApp

3️⃣  INICIAR BOT
    → npm start

4️⃣  CONECTAR AO WHATSAPP
    → Escanear QR Code

5️⃣  TESTAR COMANDOS
    → Enviar: !menu

═════════════════════════════════════════════════════════════════════
`);

console.log(`
📊 O QUE FOI ADICIONADO:
═════════════════════════════════════════════════════════════════════

✨ SEGURANÇA
   • Validação robusta de entrada (Validator)
   • Anti-spam e rate limiting (RateLimiter)
   • Configuração centralizada (.env)

✨ LOGGING
   • Logs persistentes em arquivo
   • Separação por tipo (erro, comando, XP)
   • Níveis: error, warn, info, debug

✨ COMANDOS
   • Gerenciador centralizado (CommandManager)
   • Aliases e categorias
   • Help dinâmico

✨ EXPERIÊNCIA
   • Sistema de XP melhorado
   • Progressão exponencial
   • Leaderboard

✨ DOCUMENTAÇÃO
   • 8 arquivos .md
   • 1000+ linhas de documentação
   • Exemplos práticos

═════════════════════════════════════════════════════════════════════
`);

console.log(`
📁 NOVOS ARQUIVOS:
═════════════════════════════════════════════════════════════════════

config/
  └── environment.js            ← Carregamento de .env

utils/
  ├── validator.js              ← Validação de entrada
  ├── ratelimiter.js            ← Anti-spam
  └── commandmanager.js         ← Gerenciador de comandos

comandos/
  └── exemplo.js                ← Template para novo comando

.env.example                      ← Variáveis de ambiente

Documentação:
  ├── SUMARIO.md
  ├── QUICKSTART.md
  ├── MELHORIAS.md
  ├── DESENVOLVIMENTO.md
  ├── COMMAND_API.md
  ├── CONTRIBUTING.md
  └── DEPLOYMENT.md

═════════════════════════════════════════════════════════════════════
`);

console.log(`
⚡ INÍCIO RÁPIDO (Linux/Mac):
═════════════════════════════════════════════════════════════════════

# 1. Instalar
npm install

# 2. Configurar
cp .env.example .env
nano .env  # Editar com seu número

# 3. Iniciar
npm start

═════════════════════════════════════════════════════════════════════
`);

console.log(`
⚡ INÍCIO RÁPIDO (Windows):
═════════════════════════════════════════════════════════════════════

# 1. Instalar
npm install

# 2. Configurar
copy .env.example .env
notepad .env  # Editar com seu número

# 3. Iniciar
npm start

═════════════════════════════════════════════════════════════════════
`);

console.log(`
❓ DÚVIDAS FREQUENTES:
═════════════════════════════════════════════════════════════════════

P: Qual é o meu número do WhatsApp?
R: Format: 5511999999999 (sem espaços, caracteres especiais ou +)

P: O bot não conecta!
R: Limpe cache: npm run clean && npm start

P: Como criar um novo comando?
R: Leia DESENVOLVIMENTO.md - tem template completo

P: Onde vejo os erros?
R: Verifique logs/errors-*.log

P: Preciso de mais XP por mensagem?
R: Editar .env: XP_PER_MESSAGE=15

═════════════════════════════════════════════════════════════════════
`);

console.log(`
📖 COMECE AGORA:
═════════════════════════════════════════════════════════════════════

👉 Abra QUICKSTART.md para instalação passo a passo

Será levado a:
1. Instalar em 30 segundos
2. Configurar em 1 minuto
3. Iniciar em 30 segundos
4. Conectar em 2 minutos
5. Usar comandos! ✅

═════════════════════════════════════════════════════════════════════

🎉 Obrigado por usar o Kasane Teto Bot!

Desenvolvido com ❤️ por Lightshzk
Versão: 2.0 - "Super Melhorado"
Status: ✅ Pronto para Produção

═════════════════════════════════════════════════════════════════════
`);

console.log(`
Pressione Ctrl+C para sair

`);
