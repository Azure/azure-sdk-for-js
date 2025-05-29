"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateKey = generateKey;
const tslib_1 = require("tslib");
const node_crypto_1 = tslib_1.__importDefault(require("node:crypto"));
/**
 * @internal
 */
async function generateKey(secret, stringToSign) {
    const result = encodeURIComponent(node_crypto_1.default.createHmac("sha256", secret).update(stringToSign).digest("base64"));
    return result;
}
//# sourceMappingURL=crypto.js.map