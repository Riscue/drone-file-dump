'use strict';

const path = require('path');
const fs = require('fs');

function dumpFiles() {
    let settings = require('drone-env-parser').parseEnvs();

    for (const file of settings.files) {
        ensureDirectoryExistence(file.filename);
        fs.writeFileSync(file.filename, file.content);
    }
}

function ensureDirectoryExistence(filePath) {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

module.exports = {
    dumpFiles
};
