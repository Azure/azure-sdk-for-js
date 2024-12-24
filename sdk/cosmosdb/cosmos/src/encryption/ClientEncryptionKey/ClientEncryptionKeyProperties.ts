// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EncryptionKeyWrapMetadata } from "../EncryptionKeyWrapMetadata";

/**
 * Details of a client encryption key for use with the Azure Cosmos DB service.
 */
export class ClientEncryptionKeyProperties {
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
  wrappedDataEncryptionKey: Buffer;
  /**
   * Metadata used to wrap/unwrap client encryption key using customer managed key.
   */
  encryptionKeyWrapMetadata: EncryptionKeyWrapMetadata;
  /**
   * @internal
   */
  etag: string;

  constructor(
    id: string,
    encryptionAlgorithm: string,
    etag: string,
    wrappedDataEncryptionKey: Buffer,
    encryptionKeyWrapMetadata: EncryptionKeyWrapMetadata,
  ) {
    this.id = id;
    this.encryptionAlgorithm = encryptionAlgorithm;
    this.etag = etag;
    this.wrappedDataEncryptionKey = wrappedDataEncryptionKey;
    this.encryptionKeyWrapMetadata = encryptionKeyWrapMetadata;
  }
}
