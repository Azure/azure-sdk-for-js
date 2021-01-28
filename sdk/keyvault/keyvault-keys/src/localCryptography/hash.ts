// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createHash as cryptoCreateHash } from "crypto";

/**
 * @internal
 * Use the platform-local hashing functionality
 */
export async function createHash(algorithm: string, data: Uint8Array): Promise<Buffer> {
  const hash = cryptoCreateHash(algorithm);
  hash.update(Buffer.from(data));
  const digest = hash.digest();
  return digest;
}
