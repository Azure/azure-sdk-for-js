// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GetTokenOptions } from "@azure/core-auth";

/**
 * @internal
 */
export const multiTenantErrorMessage =
  "A getToken request was attempted with a tenant different than the tenant configured at the initialization of the credential, but multi-tenant authentication has been disabled by the environment variable AZURE_IDENTITY_DISABLE_MULTITENANTAUTH.";

/**
 * Of getToken contains a tenantId, this functions allows picking this tenantId as the appropriate for authentication,
 * unless multitenant authentication has been disabled through the AZURE_IDENTITY_DISABLE_MULTITENANTAUTH (on Node.js),
 * or unless the original tenant Id is `adfs`.
 * @internal
 */
export function processMultiTenantRequest(
  tenantId?: string,
  getTokenOptions?: GetTokenOptions
): string | undefined {
  if (
    // Only if a getTokenOptions.tenantId was received
    getTokenOptions?.tenantId &&
    // Disabled if the credential has been configured with `adfs` as the tenant Id.
    tenantId === "adfs"
  ) {
    throw new Error(multiTenantErrorMessage);
  }
  return getTokenOptions?.tenantId || tenantId;
}
