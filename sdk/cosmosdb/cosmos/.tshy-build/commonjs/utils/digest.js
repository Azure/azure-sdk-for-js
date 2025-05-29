"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.digest = digest;
const node_crypto_1 = require("node:crypto");
async function digest(str) {
    const hash = (0, node_crypto_1.createHash)("sha256");
    hash.update(str, "utf8");
    return hash.digest("hex");
}
//# sourceMappingURL=digest.js.map