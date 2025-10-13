// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Generated Universally Unique Identifier
 *
 * @returns RFC4122 v4 UUID.
 */
export function randomUUID(): string {
  return globalThis.crypto.randomUUID();
}
