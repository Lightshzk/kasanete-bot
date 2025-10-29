function logInfo(msg) {
    console.log(`\x1b[36m[INFO]\x1b[0m ${msg}`);
}

function logReady(msg) {
    console.log(`\x1b[32m[READY]\x1b[0m ${msg}`);
}

module.exports = { logInfo, logReady };
