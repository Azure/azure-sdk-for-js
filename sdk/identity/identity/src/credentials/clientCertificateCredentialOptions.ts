// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../client/identityClient";
import { TokenCachePersistenceOptions } from "../tokenCache/persistencePlatforms";

/**
 * Optional parameters for the {@link ClientCertificateCredential} class.
 */
export interface ClientCertificateCredentialOptions extends TokenCredentialOptions {
  /**
   * Option to include x5c header for SubjectName and Issuer name authorization.
   * Set this option to send base64 encoded public certificate in the client assertion header as an x5c claim
   */
  sendCertificateChain?: boolean;

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
