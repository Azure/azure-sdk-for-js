// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Verify } from "crypto";
import { LocalCryptographyUnsupportedError } from "./models";

/**
 * @internal
 * Use the platform-local hashing functionality
 */
export async function createHash(_algorithm: string, _data: Uint8Array): Promise<Buffer> {
  throw new LocalCryptographyUnsupportedError(
    "Our libraries don't currently support browser hashing"
  );
}

/**
 * @internal
 * Use the platform-local verify functionality
 */
export function createVerify(_algorithm: string, _data: Uint8Array): Verify {
  throw new LocalCryptographyUnsupportedError(
    "Our libraries don't currently support browser hashing"
  );
}
