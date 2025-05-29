// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AeadAes256CbcHmacSha256Algorithm {
    constructor(_cacheTimeToLive) {
        throw new Error("Client-side Encryption not supported in browser environment");
    }
}
export function randomBytes(_size) {
    throw new Error("Client-side random generator not supported in browser environment");
}
//# sourceMappingURL=AeadAes256CbcHmacSha256Algorithm-browser.mjs.map