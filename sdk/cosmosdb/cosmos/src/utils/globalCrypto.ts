// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

let globalCrypto: Crypto | undefined;

export function getGlobalCrypto(): Crypto {
  if (globalCrypto) {
    return globalCrypto;
  }
  // eslint-disable-next-line @azure/azure-sdk/ts-no-window
  const globalRef: any = typeof self === "undefined" ? window : self;

  if (!globalRef) {
    throw new Error("Could not find global");
  }

  globalCrypto = globalRef.crypto || globalRef.msCrypto;

  if (!globalCrypto || !globalCrypto.subtle) {
    throw new Error("Environment does not support required cryptography functions");
  }

  return globalCrypto;
}
