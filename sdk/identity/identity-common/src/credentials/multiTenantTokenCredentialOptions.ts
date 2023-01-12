// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../tokenCredentialOptions";

/**
 * Options for multi-tenant applications which allows for additionally allowed tenants.
 */
export interface MultiTenantTokenCredentialOptions extends TokenCredentialOptions {
  /**
   * For multi-tenant applications, specifies additional tenants for which the credential may acquire tokens.
   * Add the wildcard value "*" to allow the credential to acquire tokens for any tenant the application is installed.
   */
  additionallyAllowedTenants?: string[];
}
