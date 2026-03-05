"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetKeyTest = exports.KeyTest = void 0;
const test_perf_1 = require("@azure-tools/test-perf");
const keyvault_keys_1 = require("@azure/keyvault-keys");
const utils_js_1 = require("../utils.js");
const node_crypto_1 = require("node:crypto");
class KeyTest extends test_perf_1.PerfTest {
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
    static keyName = `k-${(0, node_crypto_1.randomUUID)()}`;
    constructor() {
        super();
        this.keyClient = new keyvault_keys_1.KeyClient(utils_js_1.keyVaultUri, utils_js_1.credential);
    }
    async globalSetup() {
        // Create a single shared key for all tests
        await this.keyClient.createRsaKey(KeyTest.keyName, {
            keySize: this.parsedOptions.keySize.value,
        });
    }
    async globalCleanup() {
        const poller = await this.keyClient.beginDeleteKey(KeyTest.keyName);
        const result = await poller.pollUntilDone();
        if (result.properties.recoveryId) {
            await this.keyClient.purgeDeletedKey(KeyTest.keyName);
        }
    }
}
exports.KeyTest = KeyTest;
class GetKeyTest extends KeyTest {
    async run() {
        await this.keyClient.getKey(KeyTest.keyName);
    }
}
exports.GetKeyTest = GetKeyTest;
//# sourceMappingURL=get.spec.js.map