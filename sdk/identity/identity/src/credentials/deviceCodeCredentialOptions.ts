// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../client/identityClient";
import { AuthenticationRecord } from "../client/msalClient";

/**
 * Defines options for the DeviceCodeCredential class.
 */
export interface DeviceCodeCredentialOptions extends TokenCredentialOptions {
  /**
   * Whether to persist the authentication cache.
   */
  persistenceEnabled?: boolean;

  /**
   * The authentication record to use to find existing tokens in the cache
   */
  authenticationRecord?: AuthenticationRecord;

  /**
   * Path to the authentication cache, if file-based
   */
  cachePath?: string;
}
