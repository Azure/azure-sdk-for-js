// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const globalRef: any = typeof self === "undefined" ? window : self;

if (!globalRef) {
  throw new Error("Could not find global");
}

const globalCrypto: Crypto = globalRef.crypto || globalRef.msCrypto;

if (!globalCrypto || !globalCrypto.subtle) {
  throw new Error("Browser does not support cryptography functions");
}

export { globalCrypto };
