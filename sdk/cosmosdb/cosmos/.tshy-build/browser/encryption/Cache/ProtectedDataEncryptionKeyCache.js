// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
// TODO: add support for browser environment in phase 2
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ProtectedDataEncryptionKeyCache {
    constructor(_cacheTimeToLive) {
        throw new Error("Client-side Encryption not supported in browser environment");
    }
}
export function randomBytes(_size) {
    throw new Error("Client-side random generator not supported in browser environment");
}
export function createHmac(_algorithm, _key) {
    throw new Error("Client-side random generator not supported in browser environment");
}
//# sourceMappingURL=ProtectedDataEncryptionKeyCache-browser.mjs.map