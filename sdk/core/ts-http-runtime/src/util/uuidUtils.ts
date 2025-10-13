// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Generated Universally Unique Identifier
 *
 * @returns RFC4122 v4 UUID.
 * @internal
 */
export function randomUUID(): string {
  // globalThis.crypto.randomUUID is available in Node.js 19+ and is always available
  // (no secure context requirement unlike browsers)
  return globalThis.crypto.randomUUID();
}
