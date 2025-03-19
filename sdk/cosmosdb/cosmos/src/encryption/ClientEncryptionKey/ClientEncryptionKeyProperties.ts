// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EncryptionKeyWrapMetadata } from "../EncryptionKeyWrapMetadata";

/**
 * Details of a client encryption key for use with the Azure Cosmos DB service.
 */
export interface ClientEncryptionKeyProperties {
  /**
   * unique identifier for the client encryption key
   */
  id: string;
  /**
   * Encryption algorithm that will be used along with this client encryption key to encrypt/decrypt data
   */
  encryptionAlgorithm: string;
  /**
   * Wrapped (encrypted) form of the client encryption key.
   */
  wrappedDataEncryptionKey: Uint8Array;
  /**
   * Metadata used to wrap/unwrap client encryption key using customer managed key.
   */
  encryptionKeyWrapMetadata: EncryptionKeyWrapMetadata;
  /**
   * etag associated with the client encryption key.
   * @internal
   */
  etag: string;
}
