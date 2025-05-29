"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.signString = signString;
const node_crypto_1 = require("node:crypto");
async function signString(key, toSign) {
    const hmac = (0, node_crypto_1.createHmac)("sha256", key).update(toSign).digest("base64");
    return encodeURIComponent(hmac);
}
//# sourceMappingURL=hmacSha256.js.map