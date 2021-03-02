// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createHash as cryptoCreateHash, createVerify as cryptoCreateVerify, Verify } from "crypto";

/**
 * @internal
 * Use the platform-local hashing functionality
 */
export async function createHash(algorithm: string, data: Uint8Array): Promise<Buffer> {
  const hashAlgorithm = algorithmToHashAlgorithm[algorithm];
  if (!hashAlgorithm) {
    throw new Error(
      `Invalid algorithm ${algorithm} passed to createHash. This likely means that ${algorithm} is not supported locally.`
    );
  }
  const hash = cryptoCreateHash(hashAlgorithm);
  hash.update(Buffer.from(data));
  const digest = hash.digest();
  return digest;
}

/**
 * @internal
 * Use the platform-local verify functionality
 */
export function createVerify(algorithm: string, data: Uint8Array): Verify {
  const verifyAlgorithm = algorithmToHashAlgorithm[algorithm];
  if (!verifyAlgorithm) {
    throw new Error(
      `Invalid algorithm ${algorithm} passed to verify. This likely means that ${algorithm} is not supported locally.`
    );
  }
  const verifier = cryptoCreateVerify(verifyAlgorithm);
  verifier.update(Buffer.from(data));
  verifier.end();
  return verifier;
}

/**
 * @internal
 * Mapping between signature algorithms and their corresponding hash algorithms. Externally used for testing.
 **/
const algorithmToHashAlgorithm: { [s: string]: string } = {
  PS256: "SHA256",
  RS256: "SHA256",
  PS384: "SHA384",
  RS384: "SHA384",
  PS512: "SHA512",
  RS512: "SHA512"
};
