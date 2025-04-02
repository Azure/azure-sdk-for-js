// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EncryptionKeyResolver } from ".";

/**
 * Represents the encryption options associated with a CosmosClient.
 */
export interface ClientEncryptionOptions {
  /** resolver that allows interaction with key encryption keys. */
  keyEncryptionKeyResolver: EncryptionKeyResolver;

  /** time for which encryption keys and settings will be cached. Default is 7200 seconds */
  encryptionKeyTimeToLiveInSeconds?: number;
}
