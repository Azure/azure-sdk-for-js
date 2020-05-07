const globalRef: any = typeof self === "undefined" ? window : self;

if (!globalThis) {
  throw new Error("Could not find global");
}

const globalCrypto: Crypto = globalRef.crypto || globalRef.msCrypto;

if (!globalCrypto || !globalCrypto.subtle) {
  throw new Error("Browser does not support cryptography functions");
}

export { globalCrypto };
