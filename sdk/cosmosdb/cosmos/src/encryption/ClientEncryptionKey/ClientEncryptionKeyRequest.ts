// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ClientEncryptionKeyDefinition } from "./ClientEncryptionKeyDefinition";
import { EncryptionKeyWrapMetadata } from "../EncryptionKeyWrapMetadata";

/**
 * Interface representing a request for client encryption key in Cosmos DB.
 */
export interface ClientEncryptionKeyRequest extends ClientEncryptionKeyDefinition {
  /**
   * The algorithm used to encrypt/decrypt data.
   */
  encryptionAlgorithm: string;
  /**
   * Metadata containing information necessary to wrap/unwrap the encryption key.
   */
  keyWrapMetadata: EncryptionKeyWrapMetadata;
  /**
   * The wrapped (encrypted) data encryption key.
   */
  wrappedDataEncryptionKey: string;
}
