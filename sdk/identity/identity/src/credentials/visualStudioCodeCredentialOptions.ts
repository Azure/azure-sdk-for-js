// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../tokenCredentialOptions";

/**
 * Provides options to configure the Visual Studio Code credential.
 */
export interface VisualStudioCodeCredentialOptions extends TokenCredentialOptions {
  /**
   * Optionally pass in a Tenant ID to be used as part of the credential
   */
  tenantId?: string;
  /**
   * For multi-tenant applications, specifies additional tenants for which the credential may acquire tokens.
   * Add the wildcard value "*" to allow the credential to acquire tokens for any tenant the application is installed.
   */
  additionallyAllowedTenants?: string[];  
}
