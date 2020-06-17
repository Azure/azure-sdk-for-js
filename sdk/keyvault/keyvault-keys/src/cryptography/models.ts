// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  EncryptionAlgorithm,
} from "../keysModels";


export class LocalCryptographyUnsupportedError extends Error {
}

/**
 * Result of the {@link encrypt} operation.
 */
export interface EncryptResult {
  /**
   * Result of the {@link encrypt} operation in bytes.
   */
  result: Uint8Array;
  /**
   * The {@link EncryptionAlgorithm} used to encrypt the data.
   */
  algorithm: EncryptionAlgorithm;
  /**
   * The ID of the KeyVault Key used to encrypt the data.
   */
  keyID?: string;
}