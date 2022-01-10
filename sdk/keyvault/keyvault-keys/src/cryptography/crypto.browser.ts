// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LocalCryptographyUnsupportedError } from "./models";

/**
 * @internal
 * Use the platform-local hashing functionality
 */
export function createHash(_algorithm: string, _data: Uint8Array): never {
  throw new LocalCryptographyUnsupportedError(
    "Our libraries don't currently support browser hashing"
  );
}

/**
 * @internal
 * Use the platform-local verify functionality
 */
export function createVerify(_algorithm: string, _data: Uint8Array): never {
  throw new LocalCryptographyUnsupportedError(
    "Our libraries don't currently support browser hashing"
  );
}

/**
 * @internal
 * Use the platform-local randomBytes functionality
 */
export function randomBytes(_length: number): never {
  throw new LocalCryptographyUnsupportedError(
    "Our libraries don't currently support browser crypto"
  );
}
