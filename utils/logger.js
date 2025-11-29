const fs = require('fs');
const path = require('path');

/**
 * Sistema de Logging com persistência
 * Registra todos os eventos, erros e atividades
 */

class Logger {
    constructor(options = {}) {
        this.logDir = path.join(__dirname, '../logs');
        this.maxFileSize = options.maxFileSize || 10 * 1024 * 1024; // 10MB
        this.logLevel = options.logLevel || 'info';
        
        this.levels = {
            error: 0,
            warn: 1,
            info: 2,
            debug: 3
        };

        // Criar diretório de logs se não existir
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
    }

    /**
     * Formata timestamp
     */
    getTimestamp() {
        return new Date().toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo'
        });
    }

    /**
     * Retorna nome do arquivo de log baseado na data
     */
    getLogFileName(type = 'general') {
        const date = new Date().toISOString().split('T')[0];
        return path.join(this.logDir, `${type}-${date}.log`);
    }

    /**
     * Escreve em arquivo
     */
    writeToFile(message, type = 'general') {
        try {
            const filePath = this.getLogFileName(type);
            const content = `[${this.getTimestamp()}] ${message}\n`;

            fs.appendFileSync(filePath, content, 'utf-8');

            // Verificar tamanho do arquivo
            const stats = fs.statSync(filePath);
            if (stats.size > this.maxFileSize) {
                this.rotateLog(filePath);
            }
        } catch (error) {
            console.error('❌ Erro ao escrever log:', error.message);
        }
    }

    /**
     * Rotaciona arquivo de log
     */
    rotateLog(filePath) {
        try {
            const timestamp = Date.now();
            const newPath = filePath.replace('.log', `-${timestamp}.log`);
            fs.renameSync(filePath, newPath);
        } catch (error) {
            console.error('❌ Erro ao rotacionar log:', error.message);
        }
    }

    /**
     * Log de informação
     */
    info(message, data = null) {
        if (this.levels[this.logLevel] < this.levels.info) return;

        const msg = data ? `${message} | ${JSON.stringify(data)}` : message;
        console.log(`ℹ️  ${msg}`);
        this.writeToFile(`[INFO] ${msg}`, 'general');
    }

    /**
     * Log de erro
     */
    error(message, error = null) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        const msg = errorMsg ? `${message} | ${errorMsg}` : message;
        
        console.error(`❌ ${msg}`);
        this.writeToFile(`[ERROR] ${msg}`, 'errors');
        
        // Se for erro de comando, registra separadamente
        if (message.includes('comando')) {
            this.writeToFile(`[ERROR] ${msg}`, 'commands');
        }
    }

    /**
     * Log de aviso
     */
    warn(message, data = null) {
        if (this.levels[this.logLevel] < this.levels.warn) return;

        const msg = data ? `${message} | ${JSON.stringify(data)}` : message;
        console.warn(`⚠️  ${msg}`);
        this.writeToFile(`[WARN] ${msg}`, 'general');
    }

    /**
     * Log de debug (apenas em debug mode)
     */
    debug(message, data = null) {
        if (this.levels[this.logLevel] < this.levels.debug) return;

        const msg = data ? `${message} | ${JSON.stringify(data)}` : message;
        console.debug(`🐛 ${msg}`);
        this.writeToFile(`[DEBUG] ${msg}`, 'debug');
    }

    /**
     * Log de comando
     */
    command(userId, userName, command, args = []) {
        const msg = `Usuário: ${userName} (${userId}) | Comando: ${command} ${args.join(' ')}`;
        this.writeToFile(`[COMMAND] ${msg}`, 'commands');
    }

    /**
     * Log de XP
     */
    xp(userId, userName, xpGain, newLevel) {
        const msg = `Usuário: ${userName} (${userId}) | XP: +${xpGain} | Nível: ${newLevel}`;
        this.writeToFile(`[XP] ${msg}`, 'xp');
    }

    /**
     * Log de conexão
     */
    connection(status, details = '') {
        const msg = `Status: ${status} | ${details}`;
        console.log(`🔌 ${msg}`);
        this.writeToFile(`[CONNECTION] ${msg}`, 'connection');
    }
}

// Compatibilidade com código antigo
function logInfo(msg) {
    console.log(`\x1b[36m[INFO]\x1b[0m ${msg}`);
}

function logReady(msg) {
    console.log(`\x1b[32m[READY]\x1b[0m ${msg}`);
}

module.exports = Logger;
module.exports.logInfo = logInfo;
module.exports.logReady = logReady;
