"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalCrypto = void 0;
// eslint-disable-next-line @azure/azure-sdk/ts-no-window
const globalRef = typeof self === "undefined" ? window : self;
if (!globalRef) {
    throw new Error("Could not find global");
}
const globalCrypto = globalRef.crypto || globalRef.msCrypto;
exports.globalCrypto = globalCrypto;
if (!globalCrypto || !globalCrypto.subtle) {
    throw new Error("Browser does not support cryptography functions");
}
//# sourceMappingURL=globalCrypto.js.map