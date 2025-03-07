// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EncryptionKeyResolver, EncryptionTimeToLive } from ".";

/**
 * Represents the encryption options associated with a CosmosClient.
 */
export interface ClientEncryptionOptions {
  /** resolver that allows interaction with key encryption keys. */
  keyEncryptionKeyResolver: EncryptionKeyResolver;
  /** name of the resolver to use for client side encryption.
   * Currently only AzureKeyVault implementation is supported.
   */
  encryptionKeyResolverName: string;
  /** time for which encryption keys and settings will be cached. Default is 2 hour */
  encryptionKeyTimeToLive?: EncryptionTimeToLive;
}
