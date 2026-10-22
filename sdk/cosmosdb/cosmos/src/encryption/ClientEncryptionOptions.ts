// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EncryptionKeyResolver } from "./index.js";

/**
 * Represents the encryption options associated with a CosmosClient.
 */
export interface ClientEncryptionOptions {
  /** resolver that allows interaction with key encryption keys. */
  keyEncryptionKeyResolver: EncryptionKeyResolver;

  /** time for which encryption keys and settings will be cached. Default is 7200 seconds */
  encryptionKeyTimeToLiveInSeconds?: number;

  /**
   * Opts into a JS-only encrypted-value format experiment. Not a production or
   * cross-language format; it does not change the container encryption policy.
   */
  experimental?: {
    /**
     * Format for new encrypted values. Defaults to "legacy".
     * "authenticatedType" binds the outer type marker using experimental algorithm version 2.
     */
    encryptedValueFormat?: "legacy" | "authenticatedType";
    /**
     * Whether to accept legacy algorithm version 1 values. Defaults to "reject" for
     * "authenticatedType" writes and "allow" for legacy writes.
     * Explicit "allow" supports migration but retains the legacy integrity limitation.
     * "reject" requires encryptedValueFormat to be "authenticatedType".
     */
    legacyValueReadPolicy?: "allow" | "reject";
  };
}
