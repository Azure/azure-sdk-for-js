"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.shaHMAC = exports.shaHash = void 0;
const node_crypto_1 = require("node:crypto");
const shaHash = async (content) => (0, node_crypto_1.createHash)("sha256").update(content).digest("base64");
exports.shaHash = shaHash;
const shaHMAC = async (secret, content) => {
    const decodedSecret = Buffer.from(secret, "base64");
    return (0, node_crypto_1.createHmac)("sha256", decodedSecret).update(content).digest("base64");
};
exports.shaHMAC = shaHMAC;
//# sourceMappingURL=cryptoUtils.js.map