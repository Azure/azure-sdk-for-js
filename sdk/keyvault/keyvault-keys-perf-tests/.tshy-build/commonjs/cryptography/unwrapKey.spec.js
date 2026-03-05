"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnwrapKeyTest = void 0;
const node_crypto_1 = require("node:crypto");
const cryptography_spec_js_1 = require("./cryptography.spec.js");
class UnwrapKeyTest extends cryptography_spec_js_1.CryptographyTest {
    encryptedKey;
    wrapAlgorithm = "RSA-OAEP-256";
    async setup() {
        const wrapResult = await cryptography_spec_js_1.CryptographyTest.cryptoClient.wrapKey(this.wrapAlgorithm, (0, node_crypto_1.randomBytes)(32));
        this.encryptedKey = wrapResult.result;
    }
    async run() {
        await cryptography_spec_js_1.CryptographyTest.cryptoClient.unwrapKey(this.wrapAlgorithm, this.encryptedKey);
    }
}
exports.UnwrapKeyTest = UnwrapKeyTest;
//# sourceMappingURL=unwrapKey.spec.js.map