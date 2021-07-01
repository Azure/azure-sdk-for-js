// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GetTokenOptions } from "@azure/core-auth";

/**
 * @internal
 */
export const multiTenantErrorMessage =
  "A getToken request was attempted with a tenant different than the tenant configured at the initialization of the credential, but multi-tenant authentication was not enabled in this credential instance.";

/**
 * Verifies whether locally assigned tenants are equal to tenants received through getToken.
 * Returns the appropriate tenant.
 * @internal
 */
export function processMultiTenantRequest(
  tenantId?: string,
  allowMultiTenantAuthentication?: boolean,
  getTokenOptions?: GetTokenOptions
): string | undefined {
  if (
    !allowMultiTenantAuthentication &&
    getTokenOptions?.tenantId &&
    tenantId &&
    getTokenOptions.tenantId !== tenantId
  ) {
    throw new Error(multiTenantErrorMessage);
  }
  if (allowMultiTenantAuthentication && getTokenOptions?.tenantId) {
    return getTokenOptions.tenantId;
  }
  return tenantId;
}
