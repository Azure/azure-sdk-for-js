// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../client/identityClient";

/**
 * Options for the {@link AzureCliCredential}
 */
export interface AzureCliCredentialOptions extends TokenCredentialOptions {
  /**
   * Allows specifying a tenant ID
   */
  tenantId?: string;
  /**
   * If set to true, allows authentication flows to change the tenantId of the request if a different tenantId is received from a challenge or through a direct getToken call.
   */
  allowMultiTenantAuthentication?: boolean;
}
