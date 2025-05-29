// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
// eslint-disable-next-line @azure/azure-sdk/ts-no-window
const globalRef = typeof self === "undefined" ? window : self;
if (!globalRef) {
    throw new Error("Could not find global");
}
const globalCrypto = globalRef.crypto || globalRef.msCrypto;
if (!globalCrypto || !globalCrypto.subtle) {
    throw new Error("Browser does not support cryptography functions");
}
export { globalCrypto };
//# sourceMappingURL=globalCrypto.js.map