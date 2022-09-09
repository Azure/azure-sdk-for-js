// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../tokenCredentialOptions";

/**
 * Options for the {@link AzurePowerShellCredential}
 */
export interface AzurePowerShellCredentialOptions extends TokenCredentialOptions {
  /**
   * Allows specifying a tenant ID
   */
  tenantId?: string;
  /**
   * For multi-tenant applications, specifies additional tenants for which the credential may acquire tokens.
   * Add the wildcard value "*" to allow the credential to acquire tokens for any tenant the application is installed.
   */
  additionallyAllowedTenants?: string[];
}
