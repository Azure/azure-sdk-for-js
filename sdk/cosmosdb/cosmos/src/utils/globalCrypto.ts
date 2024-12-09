// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// eslint-disable-next-line n/no-unsupported-features/node-builtins
const globalCrypto: Crypto = globalThis.crypto;

if (!globalCrypto || !globalCrypto.subtle) {
  throw new Error("Browser does not support cryptography functions");
}

export { globalCrypto };
