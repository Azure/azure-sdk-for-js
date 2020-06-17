// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LocalCryptographyUnsupportedError } from "./models";
import {
  localSupportedAlgorithms,
  LocalSupportedAlgorithm,
  LocalSupportedAlgorithmName
} from "./algorithms";

export function nodeEncrypt(
  keyType: string,
  keyPEM: string,
  algorithmName: LocalSupportedAlgorithmName,
  plaintext: Uint8Array
): Buffer {
  const algorithm: LocalSupportedAlgorithm = localSupportedAlgorithms[algorithmName];
  if (!algorithm) {
    throw new LocalCryptographyUnsupportedError(`Unsupported algorithm ${algorithm}`);
  }

  if (!algorithm.validate(keyType)) {
    throw new Error("Key type does not match the algorithm");
  }

  return algorithm.encrypt(keyPEM, Buffer.from(plaintext));
}
