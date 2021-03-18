// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCachePersistenceOptions } from "../tokenCache/persistencePlatforms";
import { TokenCredentialOptions } from "../client/identityClient";

/**
 * Common constructor options for the credentials that use persistence.
 */
export interface PersistentCredentialOptions extends TokenCredentialOptions {
  /**
   * To provide a persistence layer to store the credentials,
   * we allow users to optionally specify {@link TokenCachePersistenceOptions} for their credential.
   *
   * This persistence layer uses DPAPI on Windows.
   * On OSX (Darwin) it tries to use the system's Keychain, otherwise if the property `allowUnencryptedStorage` is set to true, it uses an unencrypted file.
   * On Linux it tries to use the system's Keyring, otherwise if the property `allowUnencryptedStorage` is set to true, it uses an unencrypted file.
   */
  tokenCachePersistenceOptions?: TokenCachePersistenceOptions;
}
