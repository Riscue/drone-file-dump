'use strict';

const {describe, it} = require('mocha');

const fs = require('fs');

const assert = require('assert');
const mockedEnv = require('mocked-env');

const {dumpFiles} = require('../dumper');

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
        const filename = 'one-line.txt';
        const content = 'test-content';

        let restore = mockedEnv({
            PLUGIN_FILES: JSON.stringify([
                {
                    filename,
                    content
                }
            ])
        });
        try {
            dumpFiles();
            assert.strictEqual(readFile(filename), content);
        } finally {
            restore();
            deleteFile(filename);
        }
    });

    it('Dump test.txt with two line content', function () {
        const filename = 'two-lines.txt';
        const content = `first-line
second-line`;

        let restore = mockedEnv({
            PLUGIN_FILES: JSON.stringify([
                {
                    filename,
                    content
                }
            ])
        });
        try {
            dumpFiles();
            assert.strictEqual(readFile(filename), content);
        } finally {
            restore();
            deleteFile(filename);
        }
    });

    it('Dump test.txt with multi-line turkish-char content', function () {
        const filename = 'multi-lines.txt';
        const content = `first-line
.,çiöşö1^^~123ASD-..
third-line`;

        let restore = mockedEnv({
            PLUGIN_FILES: JSON.stringify([
                {
                    filename,
                    content
                }
            ])
        });
        try {
            dumpFiles();
            assert.strictEqual(readFile(filename), content);
        } finally {
            restore();
            deleteFile(filename);
        }
    });
});
