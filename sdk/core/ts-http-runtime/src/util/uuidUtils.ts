// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

interface Crypto {
  randomUUID(): string;
}

declare const globalThis: {
  crypto: Crypto;
};

/**
 * Generated Universally Unique Identifier
 *
 * @returns RFC4122 v4 UUID.
 */
export function randomUUID(): string {
  return globalThis.crypto.randomUUID();
}
