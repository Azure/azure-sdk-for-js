"use strict";
/* eslint-disable no-undef */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lib = tslib_1.__importStar(require("../../src/dtmiConventions"));
// fake class while lib not implemented
const sinon = tslib_1.__importStar(require("sinon"));
const chai_1 = require("chai");
const validParameters = [
    {
        dtmi: 'dtmi:azure:DeviceManagement:DeviceInformation;1',
        path: 'dtmi/azure/devicemanagement/deviceinformation-1.json',
        url: 'https://contoso.com/dtmi/azure/devicemanagement/deviceinformation-1.json'
    },
    {
        dtmi: 'dtmi:azure:DeviceManagement:DeviceInformation;10000',
        path: 'dtmi/azure/devicemanagement/deviceinformation-10000.json',
        url: 'https://contoso.com/dtmi/azure/devicemanagement/deviceinformation-10000.json'
    },
    {
        dtmi: 'dtmi:com:DeviceInformation;1',
        path: 'dtmi/com/deviceinformation-1.json',
        url: 'https://contoso.com/dtmi/com/deviceinformation-1.json'
    },
    {
        dtmi: 'dtmi:test:DeviceManagement:Foo:Bar:TestOneTwoThree;1',
        path: 'dtmi/test/devicemanagement/foo/bar/testonetwothree-1.json',
        url: 'https://contoso.com/dtmi/test/devicemanagement/foo/bar/testonetwothree-1.json'
    },
    {
        dtmi: 'dtmi:AZURE:DEVICEMANAGEMENT:THERMOMETER;7',
        path: 'dtmi/azure/devicemanagement/thermometer-7.json',
        url: 'https://contoso.com/dtmi/azure/devicemanagement/thermometer-7.json'
    },
    {
        dtmi: 'dtmi:thermometer;2',
        path: 'dtmi/thermometer-2.json',
        url: 'https://contoso.com/dtmi/thermometer-2.json'
    }
];
const invalidParameters = [
    { dtmi: 'dtmiazure:DeviceManagement:DeviceInformation;1' },
    { dtmi: 'dtmi;azure;DeviceManagement;DeviceInformation;1' },
    { dtmi: 'asdf' },
    { dtmi: 'dtmi:azure:DeviceManagement:DeviceInformation;-1' },
    { dtmi: 'dtmi:azure:DeviceManagement:Device-Information;1' },
    { dtmi: 'DTMI:AZURE:DEVICEMANAGEMENT:THERMOMETER;7' },
    { dtmi: 'dmti:azure:thermometer;10' }
];
describe('dtmiConventions', function () {
    afterEach(function () {
        sinon.restore();
    });
    describe('isValidDtmi', function () {
        describe('valid', function () {
            function validTest(givenDtmi) {
                const result = lib.isValidDtmi(givenDtmi);
                chai_1.assert(result, 'valid dtmi not found as valid');
            }
            // eslint-disable-next-line mocha/no-setup-in-describe
            for (let i = 0; i < validParameters.length; i++) {
                it(`should validate a correctly formatted dtmi (${validParameters[i].dtmi})`, function () { validTest(validParameters[i].dtmi); });
            }
        });
        describe('invalid', function () {
            function invalidTest(givenDtmi) {
                const result = lib.isValidDtmi(givenDtmi);
                chai_1.assert(!result, 'invalid dtmi incorrectly labelled as valid');
            }
            // eslint-disable-next-line mocha/no-setup-in-describe
            for (let i = 0; i < invalidParameters.length; i++) {
                it(`should invalidate incorrectly formatted dtmi (${invalidParameters[i].dtmi})`, function () { invalidTest(invalidParameters[i].dtmi); });
            }
        });
    });
    describe('dtmiToPath', function () {
        describe('valid', function () {
            function validTest(givenDtmi, expectedPath) {
                const result = lib.dtmiToPath(givenDtmi);
                chai_1.assert.deepEqual(result, expectedPath);
            }
            // eslint-disable-next-line mocha/no-setup-in-describe
            for (let i = 0; i < validParameters.length; i++) {
                it(`should reformat a DTMI to a generic path (${validParameters[i].dtmi})`, function () {
                    validTest(validParameters[i].dtmi, validParameters[i].path);
                });
            }
        });
        describe('invalid', function () {
            function invalidTest(givenDtmi) {
                chai_1.expect(() => {
                    lib.dtmiToPath(givenDtmi);
                }).to.throw('DTMI provided is invalid. Ensure it follows DTMI conventions.');
            }
            // eslint-disable-next-line mocha/no-setup-in-describe
            for (let i = 0; i < invalidParameters.length; i++) {
                it(`should fail if the dtmi is not formatted correctly (${invalidParameters[i].dtmi})`, function () { invalidTest(invalidParameters[i].dtmi); });
            }
        });
    });
    describe('dtmiToFullyQualifiedPath', function () {
        describe('invalid', function () {
            function invalidTest(givenDtmi) {
                chai_1.expect(() => {
                    const fakeBasePath = 'https://contoso.com';
                    lib.dtmiToQualifiedPath(givenDtmi, fakeBasePath, false);
                }).to.throw('DTMI provided is invalid. Ensure it follows DTMI conventions.');
            }
            // eslint-disable-next-line mocha/no-setup-in-describe
            for (let i = 0; i < invalidParameters.length; i++) {
                it(`should fail if the dtmi is not formatted correctly (${invalidParameters[i].dtmi})`, function () { invalidTest(invalidParameters[i].dtmi); });
            }
        });
        describe('valid', function () {
            describe('standard url', function () {
                function reformatTest(givenDtmi, expected) {
                    const fakeBasePath = 'https://contoso.com';
                    const result = lib.dtmiToQualifiedPath(givenDtmi, fakeBasePath, false);
                    chai_1.assert.deepEqual(result, expected);
                }
                // eslint-disable-next-line mocha/no-setup-in-describe
                for (let i = 0; i < validParameters.length; i++) {
                    it(`should reformat a DTMI to a qualified path (${validParameters[i].dtmi})`, function () {
                        reformatTest(validParameters[i].dtmi, validParameters[i].url);
                    });
                }
            });
            describe('expanded url', function () {
                function addExpandedTest(givenDtmi, expected) {
                    const fakeBasePath = 'https://contoso.com';
                    const result = lib.dtmiToQualifiedPath(givenDtmi, fakeBasePath, true);
                    chai_1.assert.deepEqual(result, expected);
                }
                // eslint-disable-next-line mocha/no-setup-in-describe
                for (let i = 0; i < validParameters.length; i++) {
                    it(`should reformat a DTMI to a qualified path with expanded.json (${validParameters[i].dtmi})`, function () {
                        addExpandedTest(validParameters[i].dtmi, validParameters[i].url.replace('.json', '.expanded.json'));
                    });
                }
            });
        });
    });
});
//# sourceMappingURL=dtmiConventions.spec.js.map