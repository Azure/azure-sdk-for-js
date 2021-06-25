// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GetTokenOptions } from "@azure/core-auth";

/**
 * @internal
 */
export const multiTenantError = new Error(
  "Multi-tenant authentication was attempted, but multi-tenant authentication was not enabled in this credential instance."
);

/**
 * Verifies whether locally assigned tenants are equal to tenants received through getToken.
 * Returns the appropriate tenant.
 * @internal
 */
export function processMultiTenantRequest(
  tenantId?: string,
  getTokenOptions?: GetTokenOptions
): string | undefined {
  if (
    !getTokenOptions?.allowMultiTenantAuthentication &&
    getTokenOptions?.tenantId &&
    tenantId &&
    getTokenOptions.tenantId !== tenantId
  ) {
    throw multiTenantError;
  }
  if (getTokenOptions?.allowMultiTenantAuthentication && getTokenOptions?.tenantId) {
    return getTokenOptions.tenantId;
  }
  return tenantId;
}
