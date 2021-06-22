import { GetTokenOptions } from "@azure/core-auth";

/**
 * @internal
 */
export const multiTenantError = new Error(
  "Multi-tenant authentication was attempted, but multi-tenant authentication was not enabled in this credential instance."
);

/**
 * Verifies whether locally assigned tenants are equal to tenants received through getToken.
 * @internal
 */
export function validateMultiTenantRequest(
  allowMultiTenantAuthentication?: boolean,
  tenantId?: string,
  getTokenOptions?: GetTokenOptions
): void {
  if (
    !allowMultiTenantAuthentication &&
    getTokenOptions?.tenantId &&
    tenantId &&
    getTokenOptions.tenantId !== tenantId
  ) {
    throw multiTenantError;
  }
}
