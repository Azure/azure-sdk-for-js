"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignTest = void 0;
const node_crypto_1 = require("node:crypto");
const cryptography_spec_js_1 = require("./cryptography.spec.js");
class SignTest extends cryptography_spec_js_1.CryptographyTest {
    digest;
    async setup() {
        const plaintext = (0, node_crypto_1.randomBytes)(32);
        this.digest = (0, node_crypto_1.createHash)("SHA256").update(plaintext).digest();
    }
    async run() {
        await cryptography_spec_js_1.CryptographyTest.cryptoClient.sign("RS256", this.digest);
    }
}
exports.SignTest = SignTest;
//# sourceMappingURL=sign.spec.js.map