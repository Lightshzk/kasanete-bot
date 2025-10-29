// Informações do dono do bot
module.exports = {
    // Número do dono (formato: 5521999999999@c.us)
    numero: '553598381353@c.us', // SUBSTITUA pelo seu número com DDI + DDD
    
    // Nome do dono
    nome: 'Lightshzk',
    
    // Apelido alternativo
    apelido: 'Light',
    
    // Lista de números autorizados (donos/admins)
    autorizados: [
        '553598381353@c.us', // Dono principal
        // '5521888888888@c.us', // Adicione outros números autorizados aqui
    ],
    
    // Verificar se é o dono
    isDono: function(numero) {
        return this.autorizados.includes(numero);
    },
    
    // Verificar se é o dono principal
    isDonoPrincipal: function(numero) {
        return numero === this.numero;
    },
    
    // Obter informações formatadas
    getInfo: function() {
        return {
            nome: this.nome,
            apelido: this.apelido,
            numero: this.numero,
            qtdAutorizados: this.autorizados.length
        };
    }
};