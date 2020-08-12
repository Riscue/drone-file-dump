'use strict';

function dumpFiles() {
    let settings = require('drone-env-parser').parseEnvs();
    console.log(settings);
}

module.exports = {
    dumpFiles
};
