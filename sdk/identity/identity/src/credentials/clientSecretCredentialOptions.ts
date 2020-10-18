// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../client/identityClient";
import { AuthenticationRecord } from "../client/msalClient";

/**
 * Defines options for the SubjectNameAndIssuerCredential class.
 */
export interface ClientSecretCredentialOptions extends TokenCredentialOptions {
  /**
   * Whether to persist the authentication cache.
   */
  persistenceEnabled?: boolean;

  /**
   * The authentication record to use to find existing tokens in the cache.
   */
  authenticationRecord?: AuthenticationRecord;

  /**
   * Path to the authentication cache, if file-based
   */
  cachePath?: string;
}
