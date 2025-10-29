exports.formatarTempo = (ms) => {
    const s = Math.floor(ms / 1000) % 60;
    const m = Math.floor(ms / (1000 * 60)) % 60;
    const h = Math.floor(ms / (1000 * 60 * 60)) % 24;
    const d = Math.floor(ms / (1000 * 60 * 60 * 24));
    return `${d} Dia(s) ${h} Hora(s) ${m} Minuto(s) ${s} Segundo(s)`;
};
