'use strict';

const {describe, it} = require('mocha');

const assert = require('assert');
const mockedEnv = require('mocked-env');

describe('index.js', function () {
    it('do nothing', function () {
        let restore = mockedEnv({});
        try {
            require('../index');
            assert.strictEqual("", "");
        } finally {
            restore();
        }
    });
});
