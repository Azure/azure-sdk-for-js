// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createHash as cryptoCreateHash } from "crypto";
import { isNode } from "@azure/core-http";
import { LocalCryptographyUnsupportedError } from "./models";

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
    throw new LocalCryptographyUnsupportedError(
      "Our libraries don't currently support browser hashing"
    );
  }
}
