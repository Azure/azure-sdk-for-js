"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.hmac = hmac;
const node_crypto_1 = require("node:crypto");
async function hmac(key, message) {
    return (0, node_crypto_1.createHmac)("sha256", Buffer.from(key, "base64")).update(message).digest("base64");
}
//# sourceMappingURL=hmac.js.map