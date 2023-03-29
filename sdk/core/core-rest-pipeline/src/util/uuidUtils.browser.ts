// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Generated Universally Unique Identifier
 *
 * @returns RFC4122 v4 UUID.
 * @internal
 */
export function randomUUID(): string {
  return globalThis.crypto.randomUUID();
}
