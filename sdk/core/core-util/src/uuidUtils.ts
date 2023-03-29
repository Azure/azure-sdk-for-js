// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { randomUUID as v4RandomUUID } from "crypto";

interface Crypto {
  randomUUID(): string;
}

declare const globalThis: {
  crypto: Crypto;
};

// NOTE: This is a workaround until we can use `globalThis.crypto.randomUUID` in Node.js 19+.
const uuidFunction =
  typeof globalThis?.crypto?.randomUUID === "function"
    ? globalThis.crypto.randomUUID.bind(globalThis.crypto)
    : v4RandomUUID;

/**
 * Generated Universally Unique Identifier
 *
 * @returns RFC4122 v4 UUID.
 */
export function randomUUID(): string {
  return uuidFunction();
}
