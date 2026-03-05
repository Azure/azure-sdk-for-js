"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecryptTest = void 0;
const node_crypto_1 = require("node:crypto");
const cryptography_spec_js_1 = require("./cryptography.spec.js");
class DecryptTest extends cryptography_spec_js_1.CryptographyTest {
    cipherText;
    algorithm = "RSA-OAEP-256";
    async setup() {
        const encryptResult = await cryptography_spec_js_1.CryptographyTest.cryptoClient.encrypt({
            algorithm: this.algorithm,
            plaintext: (0, node_crypto_1.randomBytes)(32),
        });
        this.cipherText = encryptResult.result;
    }
    async run() {
        await cryptography_spec_js_1.CryptographyTest.cryptoClient.decrypt({
            algorithm: this.algorithm,
            ciphertext: this.cipherText,
        });
    }
}
exports.DecryptTest = DecryptTest;
//# sourceMappingURL=decrypt.spec.js.map