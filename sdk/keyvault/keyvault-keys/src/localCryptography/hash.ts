// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createHash as cryptoCreateHash } from "crypto";
import { isNode } from '@azure/core-http';

/**
 * @internal
 * @ignore
 * Use the platform-local hashing functionality
 */
export async function createHash(algorithm: string, data: Uint8Array): Promise<Buffer> {
  if (isNode) {
    const hash = cryptoCreateHash(algorithm);
    hash.update(Buffer.from(data));
    const digest = hash.digest();
    return digest;  
  } else {
    if (window && window.crypto && window.crypto.subtle) {
      return Buffer.from(await window.crypto.subtle.digest(algorithm, Buffer.from(data)));
    } else {
      throw new Error("Browser does not support cryptography functions");
    }  
  }
}
