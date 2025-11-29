/**
 * Sistema de Validação de Entrada
 * Valida e sanitiza todas as entradas de usuários
 */

class Validator {
    /**
     * Valida se uma string está vazia ou é apenas espaços
     */
    static isEmpty(value) {
        return !value || value.trim().length === 0;
    }

    /**
     * Valida o comprimento de uma string
     */
    static validateLength(value, min = 1, max = 500) {
        const length = value.trim().length;
        return length >= min && length <= max;
    }

    /**
     * Valida se é um número válido
     */
    static isValidNumber(value) {
        return !isNaN(value) && isFinite(value);
    }

    /**
     * Valida se é um ID de WhatsApp válido
     */
    static isValidWhatsAppId(id) {
        return /^\d+@c\.us$/.test(id) || /^\d+@g\.us$/.test(id);
    }

    /**
     * Sanitiza entrada removendo caracteres perigosos
     */
    static sanitize(value) {
        if (typeof value !== 'string') return value;
        
        return value
            .trim()
            .replace(/[<>]/g, '') // Remove < e >
            .replace(/`/g, ''); // Remove backticks
    }

    /**
     * Valida argumentos de comando
     */
    static validateArgs(args, minArgs = 0, maxArgs = Infinity) {
        const count = Array.isArray(args) ? args.length : 0;
        
        if (count < minArgs) {
            return {
                valid: false,
                error: `❌ Argumentos insuficientes! Mínimo: ${minArgs}, Recebido: ${count}`
            };
        }
        
        if (count > maxArgs) {
            return {
                valid: false,
                error: `❌ Muitos argumentos! Máximo: ${maxArgs}, Recebido: ${count}`
            };
        }
        
        return { valid: true };
    }

    /**
     * Valida URL
     */
    static isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Valida email
     */
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Remove caracteres especiais mantendo espaços
     */
    static removeSpecialChars(str) {
        return str.replace(/[^a-zA-Z0-9áéíóúãõç\s]/gi, ' ').trim();
    }
}

module.exports = Validator;
