// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ALL_TENANTS, DeveloperSignOnClientId } from "../constants";
export { processMultiTenantRequest } from "./processMultiTenantRequest";
import { CredentialLogger, formatError } from "./logging";

export function checkTenantId(logger: CredentialLogger, tenantId: string): void {
  if (!tenantId.match(/^[0-9a-zA-Z-.:/]+$/)) {
    const error = new Error(
      "Invalid tenant id provided. You can locate your tenant id by following the instructions listed here: https://docs.microsoft.com/partner-center/find-ids-and-domain-names."
    );
    logger.info(formatError("", error));
    throw error;
  }
}

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

export function resolveAdditionallyAllowedTenantIds(additionallyAllowedTenants?: string[]): string[] {
  if (!additionallyAllowedTenants || additionallyAllowedTenants.length === 0) {
    return [];
  }

  if (additionallyAllowedTenants.includes("*")) {
    return ALL_TENANTS;
  }

  return additionallyAllowedTenants;
}
