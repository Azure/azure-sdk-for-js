// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../tokenCredentialOptions";

/**
 * Options for the {@link ClientAssertionCredential}
 */
export interface ClientAssertionCredentialOptions extends TokenCredentialOptions {
  /**
   * For multi-tenant applications, specifies additional tenants for which the credential may acquire tokens.
   * Add the wildcard value "*" to allow the credential to acquire tokens for any tenant the application is installed.
   */
  additionallyAllowedTenants?: string[];
}
