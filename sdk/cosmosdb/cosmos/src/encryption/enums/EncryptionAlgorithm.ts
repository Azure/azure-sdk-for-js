// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** Encryption Algorithms supported for data encryption */
export enum EncryptionAlgorithm {
  /**  Represents the authenticated encryption algorithm with associated data as described in
        http://tools.ietf.org/html/draft-mcgrew-aead-aes-cbc-hmac-sha2-05. */
  AEAD_AES_256_CBC_HMAC_SHA256 = "AEAD_AES_256_CBC_HMAC_SHA256",
}
