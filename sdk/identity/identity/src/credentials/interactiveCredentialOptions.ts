// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../client/identityClient";
import { AuthenticationRecord } from "../msal/types";
import { TokenCachePersistenceOptions } from "../tokenCache/persistencePlatforms";

/**
 * Common constructor options for the Identity credentials that requires user interaction.
 */
export interface InteractiveCredentialOptions extends TokenCredentialOptions {
  /**
   * Result of a previous authentication that can be used to retrieve the cached credentials of each individual account.
   * This is necessary to provide in case the application wants to work with more than one account per
   * Client ID and Tenant ID pair.
   *
   * This record can be retrieved by calling to the credential's `authenticate()` method, as follows:
   *
   *     const authenticationRecord = await credential.authenticate();
   *
   */
  authenticationRecord?: AuthenticationRecord;

  /**
   * Makes getToken throw if a manual authentication is necessary.
   * Developers will need to call to `authenticate()` to control when to manually authenticate.
   */
  disableAutomaticAuthentication?: boolean;

  /**
   * To provide a persistence layer to store the credentials,
   * we allow users to optionally specify {@link TokenCachePersistenceOptions} for their credential.
   *
   * This feature is not currently available on Node 8 or earlier versions of Node JS.
   *
   * This persistence layer uses DPAPI on Windows.
   * On OSX (Darwin) it tries to use the system's Keychain, otherwise if the property `allowUnencryptedStorage` is set to true, it uses an unencrypted file.
   * On Linux it tries to use the system's Keyring, otherwise if the property `allowUnencryptedStorage` is set to true, it uses an unencrypted file.
   */
  tokenCachePersistenceOptions?: TokenCachePersistenceOptions;
}
