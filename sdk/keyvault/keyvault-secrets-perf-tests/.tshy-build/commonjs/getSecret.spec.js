"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSecretTest = void 0;
const secretTest_js_1 = require("./secretTest.js");
const node_crypto_1 = require("node:crypto");
class GetSecretTest extends secretTest_js_1.SecretTest {
    static secretName = `s-${(0, node_crypto_1.randomUUID)()}`;
    options = {};
    async globalSetup() {
        await this.secretClient.setSecret(GetSecretTest.secretName, "value");
    }
    async run() {
        await this.secretClient.getSecret(GetSecretTest.secretName);
    }
    async globalCleanup() {
        await this.deleteAndPurgeSecrets(GetSecretTest.secretName);
    }
}
exports.GetSecretTest = GetSecretTest;
//# sourceMappingURL=getSecret.spec.js.map