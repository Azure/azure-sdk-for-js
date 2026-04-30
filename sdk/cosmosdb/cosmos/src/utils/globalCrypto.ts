// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const globalCrypto: Crypto = globalThis.crypto;

if (!globalCrypto || !globalCrypto.subtle) {
  throw new Error("Browser does not support cryptography functions");
}

export { globalCrypto };
