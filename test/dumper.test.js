'use strict';

const {describe, it} = require('mocha');

const fs = require('fs');

const assert = require('assert');
const mockedEnv = require('mocked-env');

function readFile(path) {
    return fs.readFileSync(path, 'utf8');
}

function deleteFile(path) {
    try {
        fs.unlinkSync(path);
    } catch (e) {
        console.error(`Could not delete settings file ${path}`);
    }
}

describe('dumper.js', function () {
    it('Dump test.txt with one line content', function () {
        const filename = "test.txt";
        const content = "test-content";

        let restore = mockedEnv({
            PLUGIN_FILES: JSON.stringify([
                {
                    filename,
                    content
                }
            ])
        });
        try {
            require('../index');
            assert.strictEqual(readFile(filename), content);
        } finally {
            restore();
            deleteFile(filename);
        }
    });
});
