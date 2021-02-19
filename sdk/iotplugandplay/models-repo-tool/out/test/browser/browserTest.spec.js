"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lib = tslib_1.__importStar(require("../../src"));
const chai_1 = require("chai");
const sinon = tslib_1.__importStar(require("sinon"));
describe('resolver -  browser', () => {
    afterEach(() => {
        sinon.restore();
    });
    describe('single resolution (no pseudo-parsing)', () => {
        it.only('integration works in browser', function (done) {
            const dtmi = 'dtmi:azure:DeviceManagement:DeviceInformation;1';
            const endpoint = 'https://devicemodels.azure.com';
            const fakeData = JSON.stringify({
                fakeDtdl: 'fakeBodyAsText'
            });
            const resolveResult = lib.resolve(dtmi, endpoint);
            resolveResult.then((actualOutput) => {
                chai_1.assert.deepStrictEqual({ [dtmi]: JSON.parse(fakeData) }, actualOutput);
                done();
            }).catch((err) => done(err));
        });
    });
});
//# sourceMappingURL=browserTest.spec.js.map