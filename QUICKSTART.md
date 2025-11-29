# 🚀 GUIA RÁPIDO - Comece em 5 Minutos

## ⏱️ Instalação Rápida

### 1. Prepare o Ambiente (30 segundos)

```bash
cd kasanete
npm install
```

### 2. Configure o Bot (1 minuto)

```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Abrir e editar (usar seu editor favorito)
# Windows: notepad .env
# Mac/Linux: nano .env
```

No arquivo `.env`, altere:
```env
OWNER_NUMBER=5511999999999      # Seu WhatsApp
OWNER_NAME=SeuNome
DEBUG_MODE=false
```

### 3. Inicie o Bot (30 segundos)

```bash
npm start
```

### 4. Conecte ao WhatsApp (2 minutos)

1. Copie o **QR Code** que aparecer no terminal
2. Abra WhatsApp no celular
3. Vá em **Configurações > Conectado a Dispositivos**
4. Clique em **Conectar Dispositivo**
5. Escaneie o QR Code

✅ **Pronto! Bot conectado!**

---

## 🎮 Testando Comandos

### Comandos Essenciais

```
!menu          → Ver todos os comandos
!ping          → Ver latência
!sobre         → Info do bot
!perfil        → Seu nível e XP
!foto          → Foto aleatória
!fotoanime     → Anime aleatório
```

### Testar em um Grupo

1. Adicione o bot em um grupo
2. Use `!menu` no grupo
3. Todos devem ver o menu

### Testar em DM

1. Envie `!ping` ao bot
2. Deve responder com latência

---

## 🛠️ Modo Desenvolvimento (Opcional)

Se quer que o bot reinicie ao editar código:

```bash
npm run dev
```

---

## 📊 Acompanhar Atividades

### Ver Logs em Tempo Real

```bash
# Erros
tail -f logs/errors-*.log

# Comandos executados
tail -f logs/commands-*.log

# Tudo
tail -f logs/general-*.log
```

---

## ⚠️ Problemas Comuns

### "Bot não conecta"

```bash
# Limpar cache e tentar novamente
npm run clean
npm start
```

### "QR Code não aparece"

1. Verifique se WhatsApp está aberto
2. Tem internet ativa?
3. Tente desconectar e reconectar

### "Comando não funciona"

1. Digite `!menu` para ver sintaxe correta
2. Verifique logs: `tail -f logs/errors-*.log`
3. Tente novamente em 10 segundos

---

## 📚 Próximas Leituras

Depois que o bot estiver funcionando, leia:

1. **README.md** - Documentação completa
2. **DESENVOLVIMENTO.md** - Como criar novos comandos
3. **COMMAND_API.md** - Referência técnica

---

## 🎯 Verificar se Está Funcionando

Envie estas mensagens ao bot:

```
!menu          ✅ Deve enviar menu
!ping          ✅ Deve mostrar latência
Boa noite      ✅ Deve responder
!comando-invalido  ⚠️ Deve mostrar erro
```

Se tudo funcionou: **Parabéns! 🎉 Bot 100% funcional!**

---

## 💾 Backup Importante

Sempre fazer backup de:

```bash
# Banco de dados
database/

# Configuração
.env

# Arquivos customizados
comandos/
```

---

## 🆘 Precisa de Ajuda?

1. Verifique **README.md**
2. Consulte **logs/errors-*.log**
3. Releia **MELHORIAS.md** para entender mudanças

---

## ✨ Próximas Features Para Adicionar

- [ ] Novo comando
- [ ] Integração com API externa
- [ ] Banco de dados melhorado
- [ ] Leaderboard visual
- [ ] Sistema de prêmios

---

**Agora sim! Seu bot está pronto! 🎤✨**

Aproveite e divirta-se!
