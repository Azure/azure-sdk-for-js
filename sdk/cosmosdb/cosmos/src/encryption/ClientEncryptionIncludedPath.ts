// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EncryptionType, EncryptionAlgorithm } from "./enums";

/**
 * Represents a path for encryption and its associated settings.
 */
export class ClientEncryptionIncludedPath {
  /**
   * name of the path to be encrypted
   */
  public path: string;
  /**
   * identifier of the client encryption key to use to encrypt the path
   */
  public clientEncryptionKeyId: string;
  /**
   * type of encryption to be performed (Deterministic or Randomized)
   */
  public encryptionType: EncryptionType;
  /**
   * encryption algorithm to be used
   * currently only AEAD_AES_256_CBC_HMAC_SHA256 algo is supported
   */
  public encryptionAlgorithm: EncryptionAlgorithm;

  constructor(
    path: string,
    clientEncryptionKeyId: string,
    encryptionType: EncryptionType,
    encryptionAlgorithm: EncryptionAlgorithm,
  ) {
    this.path = path;
    this.clientEncryptionKeyId = clientEncryptionKeyId;
    this.encryptionType = encryptionType;
    this.encryptionAlgorithm = encryptionAlgorithm;
  }
}
