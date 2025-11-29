/**
 * Sistema de Rate Limiting e Anti-Spam
 * Previne flood e abuso de comandos
 */

class RateLimiter {
    constructor(options = {}) {
        this.maxMessages = options.maxMessages || 10;
        this.windowMs = options.windowMs || 60000; // 1 minuto
        this.userLimits = new Map();
        this.commandLimits = new Map();
        this.spamWarnings = new Map();
        
        // Limpar dados antigos a cada 5 minutos
        this.cleanupInterval = setInterval(() => {
            this.cleanup();
        }, 5 * 60 * 1000);
    }

    /**
     * Verifica se um usuário está com rate limit
     */
    checkUserLimit(userId) {
        const now = Date.now();
        const userKey = userId;

        if (!this.userLimits.has(userKey)) {
            this.userLimits.set(userKey, {
                count: 1,
                resetTime: now + this.windowMs,
                warnings: 0
            });
            return { allowed: true, remaining: this.maxMessages - 1 };
        }

        const limit = this.userLimits.get(userKey);

        // Se a janela expirou, reseta
        if (now > limit.resetTime) {
            limit.count = 1;
            limit.resetTime = now + this.windowMs;
            limit.warnings = 0;
            return { allowed: true, remaining: this.maxMessages - 1 };
        }

        // Incrementa contador
        limit.count++;

        // Verifica se excedeu limite
        if (limit.count > this.maxMessages) {
            limit.warnings = (limit.warnings || 0) + 1;
            
            return {
                allowed: false,
                remaining: 0,
                warnings: limit.warnings,
                resetIn: Math.ceil((limit.resetTime - now) / 1000)
            };
        }

        return {
            allowed: true,
            remaining: this.maxMessages - limit.count
        };
    }

    /**
     * Verifica limite de comandos específicos
     */
    checkCommandLimit(userId, command, maxPerWindow = 3) {
        const now = Date.now();
        const commandKey = `${userId}:${command}`;

        if (!this.commandLimits.has(commandKey)) {
            this.commandLimits.set(commandKey, {
                count: 1,
                resetTime: now + this.windowMs
            });
            return { allowed: true };
        }

        const limit = this.commandLimits.get(commandKey);

        if (now > limit.resetTime) {
            limit.count = 1;
            limit.resetTime = now + this.windowMs;
            return { allowed: true };
        }

        limit.count++;

        if (limit.count > maxPerWindow) {
            return {
                allowed: false,
                resetIn: Math.ceil((limit.resetTime - now) / 1000)
            };
        }

        return { allowed: true };
    }

    /**
     * Aumenta contador de avisos de spam
     */
    addSpamWarning(userId) {
        const warnings = (this.spamWarnings.get(userId) || 0) + 1;
        this.spamWarnings.set(userId, warnings);
        return warnings;
    }

    /**
     * Limpa dados antigos
     */
    cleanup() {
        const now = Date.now();

        for (const [key, data] of this.userLimits.entries()) {
            if (now > data.resetTime) {
                this.userLimits.delete(key);
            }
        }

        for (const [key, data] of this.commandLimits.entries()) {
            if (now > data.resetTime) {
                this.commandLimits.delete(key);
            }
        }
    }

    /**
     * Reseta limite de um usuário (uso de admin)
     */
    resetUser(userId) {
        this.userLimits.delete(userId);
        this.spamWarnings.delete(userId);
    }

    /**
     * Destrói a instância e limpa intervals
     */
    destroy() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
    }
}

module.exports = RateLimiter;
