// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * The type of encryption to be performed.
 */
export enum EncryptionType {
  /** Deterministic type will always produce same encrypted value for same plaintext. */
  DETERMINISTIC = "Deterministic",
  /** Randomized type will produce different encrypted value for same plaintext. */
  RANDOMIZED = "Randomized",
}
