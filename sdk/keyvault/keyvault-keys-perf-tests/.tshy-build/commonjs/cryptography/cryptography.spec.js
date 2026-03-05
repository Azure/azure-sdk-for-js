"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptographyTest = void 0;
const test_perf_1 = require("@azure-tools/test-perf");
const keyvault_keys_1 = require("@azure/keyvault-keys");
const node_crypto_1 = require("node:crypto");
const utils_js_1 = require("../utils.js");
class CryptographyTest extends test_perf_1.PerfTest {
    options = {
        keySize: {
            required: false,
            description: "The size of the key to be created",
            shortName: "ks",
            longName: "key-size",
            defaultValue: 2048,
        },
    };
    keyClient;
    static cryptoClient;
    static keyName = `k-${(0, node_crypto_1.randomUUID)()}`;
    constructor() {
        super();
        this.keyClient = new keyvault_keys_1.KeyClient(utils_js_1.keyVaultUri, utils_js_1.credential);
    }
    async globalSetup() {
        // Create a single shared key for all tests
        const key = await this.keyClient.createRsaKey(CryptographyTest.keyName, {
            keySize: this.parsedOptions.keySize.value,
        });
        CryptographyTest.cryptoClient = new keyvault_keys_1.CryptographyClient(key, utils_js_1.credential);
    }
    async globalCleanup() {
        const poller = await this.keyClient.beginDeleteKey(CryptographyTest.keyName);
        const result = await poller.pollUntilDone();
        if (result.properties.recoveryId) {
            await this.keyClient.purgeDeletedKey(CryptographyTest.keyName);
        }
    }
}
exports.CryptographyTest = CryptographyTest;
//# sourceMappingURL=cryptography.spec.js.map