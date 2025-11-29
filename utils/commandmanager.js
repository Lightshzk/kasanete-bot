const Validator = require('./validator');

/**
 * Gerenciador de Comandos
 * Sistema centralizado para registrar e executar comandos
 */

class CommandManager {
    constructor(config = {}) {
        this.commands = new Map();
        this.aliases = new Map();
        this.config = config;
        this.prefix = config.prefix || '!';
    }

    /**
     * Registra um novo comando
     */
    register(command) {
        if (!command.name) {
            throw new Error('Comando deve ter um nome');
        }

        // Validar estrutura do comando
        const requiredFields = ['name', 'description', 'execute'];
        for (const field of requiredFields) {
            if (!command[field]) {
                throw new Error(`Comando faltando campo obrigatório: ${field}`);
            }
        }

        // Registrar comando
        this.commands.set(command.name.toLowerCase(), {
            name: command.name,
            description: command.description,
            category: command.category || 'Geral',
            aliases: command.aliases || [],
            args: command.args || [],
            minArgs: command.minArgs || 0,
            maxArgs: command.maxArgs || Infinity,
            cooldown: command.cooldown || 0, // segundos
            adminOnly: command.adminOnly || false,
            ownerOnly: command.ownerOnly || false,
            execute: command.execute,
            examples: command.examples || []
        });

        // Registrar aliases
        if (command.aliases && Array.isArray(command.aliases)) {
            for (const alias of command.aliases) {
                this.aliases.set(alias.toLowerCase(), command.name.toLowerCase());
            }
        }

        return this;
    }

    /**
     * Obtém um comando pelo nome ou alias
     */
    get(commandName) {
        const name = commandName.toLowerCase();
        
        // Verificar alias primeiro
        if (this.aliases.has(name)) {
            return this.commands.get(this.aliases.get(name));
        }
        
        // Depois verificar nome
        return this.commands.get(name);
    }

    /**
     * Verifica se um comando existe
     */
    exists(commandName) {
        return this.get(commandName) !== undefined;
    }

    /**
     * Executa um comando com validações
     */
    async execute(commandName, message, args = [], context = {}) {
        const command = this.get(commandName);

        if (!command) {
            return {
                success: false,
                error: `❌ Comando não encontrado: ${commandName}`
            };
        }

        // Validar argumentos
        const validation = Validator.validateArgs(args, command.minArgs, command.maxArgs);
        if (!validation.valid) {
            return {
                success: false,
                error: validation.error
            };
        }

        // Verificar permissões
        if (command.ownerOnly && context.ownerId !== message.from) {
            return {
                success: false,
                error: '❌ Este comando é apenas para o dono!'
            };
        }

        if (command.adminOnly && !context.isAdmin) {
            return {
                success: false,
                error: '❌ Este comando é apenas para administradores!'
            };
        }

        try {
            // Executar comando
            const result = await command.execute(message, args, context);
            return {
                success: true,
                result
            };
        } catch (error) {
            return {
                success: false,
                error: error.message || '❌ Erro ao executar comando'
            };
        }
    }

    /**
     * Lista todos os comandos
     */
    getAll() {
        return Array.from(this.commands.values());
    }

    /**
     * Agrupa comandos por categoria
     */
    groupByCategory() {
        const groups = {};

        for (const command of this.commands.values()) {
            const category = command.category || 'Geral';
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(command);
        }

        return groups;
    }

    /**
     * Gera help dinâmico
     */
    generateHelp(commandName = null) {
        if (commandName) {
            const cmd = this.get(commandName);
            if (!cmd) return `❌ Comando ${commandName} não encontrado`;

            let help = `🎤 *${cmd.name.toUpperCase()}*\n\n`;
            help += `📝 ${cmd.description}\n`;
            help += `📂 Categoria: ${cmd.category}\n`;

            if (cmd.aliases.length > 0) {
                help += `🔗 Aliases: ${cmd.aliases.join(', ')}\n`;
            }

            if (cmd.args.length > 0) {
                help += `📌 Argumentos:\n`;
                for (const arg of cmd.args) {
                    help += `   • ${arg}\n`;
                }
            }

            if (cmd.examples.length > 0) {
                help += `\n💡 Exemplos:\n`;
                for (const example of cmd.examples) {
                    help += `   ${this.prefix}${example}\n`;
                }
            }

            return help;
        }

        // Help geral
        const groups = this.groupByCategory();
        let help = `🎤 *LISTA DE COMANDOS*\n\n`;

        for (const [category, commands] of Object.entries(groups)) {
            help += `*${category}*\n`;
            for (const cmd of commands) {
                help += `${this.prefix}${cmd.name} - ${cmd.description}\n`;
            }
            help += '\n';
        }

        help += `_Digite ${this.prefix}help <comando> para mais detalhes_`;
        return help;
    }
}

module.exports = CommandManager;
