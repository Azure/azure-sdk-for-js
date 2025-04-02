// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EncryptionType, EncryptionAlgorithm } from "./enums";

/**
 * Represents a path for encryption and its associated settings.
 */
export interface ClientEncryptionIncludedPath {
  /**
   * name of the path to be encrypted
   */
  path: string;
  /**
   * identifier of the client encryption key to use to encrypt the path
   */
  clientEncryptionKeyId: string;
  /**
   * type of encryption to be performed (Deterministic or Randomized)
   */
  encryptionType: EncryptionType;
  /**
   * encryption algorithm to be used
   * currently only AEAD_AES_256_CBC_HMAC_SHA256 algo is supported
   */
  encryptionAlgorithm: EncryptionAlgorithm;
}
