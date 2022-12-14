// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ALL_TENANTS, DeveloperSignOnClientId } from "../constants";
import { CredentialLogger } from "@azure/identity-common";
export { processMultiTenantRequest } from "./processMultiTenantRequest";

/**
 * @internal
 */
export function resolveTenantId(
  logger: CredentialLogger,
  tenantId?: string,
  clientId?: string
): string {
  if (tenantId) {
    checkTenantId(logger, tenantId);
    return tenantId;
  }
  if (!clientId) {
    clientId = DeveloperSignOnClientId;
  }
  if (clientId !== DeveloperSignOnClientId) {
    return "common";
  }
  return "organizations";
}

/**
 * @internal
 */
export function resolveAddionallyAllowedTenantIds(additionallyAllowedTenants?: string[]): string[] {
  if (!additionallyAllowedTenants || additionallyAllowedTenants.length === 0) {
    return [];
  }

  if (additionallyAllowedTenants.includes("*")) {
    return ALL_TENANTS;
  }

  return additionallyAllowedTenants;
}
