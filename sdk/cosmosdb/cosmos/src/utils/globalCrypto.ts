// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// eslint-disable-next-line @azure/azure-sdk/ts-no-window
const globalRef: any = typeof self === "undefined" ? window : self;

if (!globalRef) {
  throw new Error("Could not find global");
}

const globalCrypto: Crypto = globalRef.crypto || globalRef.msCrypto;

if (!globalCrypto || !globalCrypto.subtle) {
  throw new Error("Browser does not support cryptography functions");
}

export { globalCrypto };
