const fs = require("fs");
const file = "./database.json";

function loadDB() {
    return JSON.parse(fs.readFileSync(file));
}

function saveDB(db) {
    fs.writeFileSync(file, JSON.stringify(db, null, 2));
}

exports.isVIP = (user) => {
    const db = loadDB();
    return db.users[user]?.vip === true;
};

exports.hasNSFW = (user) => {
    const db = loadDB();
    return db.users[user]?.nsfw === true;
};

exports.addVIP = (user) => {
    const db = loadDB();
    db.users[user] = db.users[user] || {};
    db.users[user].vip = true;
    saveDB(db);
};

exports.removeVIP = (user) => {
    const db = loadDB();
    if (db.users[user]) db.users[user].vip = false;
    saveDB(db);
};

exports.enableNSFW = (user) => {
    const db = loadDB();
    db.users[user] = db.users[user] || {};
    db.users[user].nsfw = true;
    saveDB(db);
};

exports.disableNSFW = (user) => {
    const db = loadDB();
    if (db.users[user]) db.users[user].nsfw = false;
    saveDB(db);
};
