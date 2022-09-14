// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ALL_TENANTS, DeveloperSignOnClientId } from "../constants";
import { CredentialLogger, formatError } from "./logging";
import { GetTokenOptions } from "@azure/core-auth";

/**
 * @internal
 */
export function checkTenantId(logger: CredentialLogger, tenantId: string): void {
  if (!tenantId.match(/^[0-9a-zA-Z-.:/]+$/)) {
    const error = new Error(
      "Invalid tenant id provided. You can locate your tenant id by following the instructions listed here: https://docs.microsoft.com/partner-center/find-ids-and-domain-names."
    );
    logger.info(formatError("", error));
    throw error;
  }
}

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

function createConfigurationErrorMessage(tenantId: string) {
  return `The current credential is not configured to acquire tokens for tenant ${tenantId}. To enable acquiring tokens for this tenant add it to the AdditionallyAllowedTenants on the credential options, or add "*" to AdditionallyAllowedTenants to allow acquiring tokens for any tenant.`;
}

/**
 * Of getToken contains a tenantId, this functions allows picking this tenantId as the appropriate for authentication,
 * unless multitenant authentication has been disabled through the AZURE_IDENTITY_DISABLE_MULTITENANTAUTH (on Node.js),
 * or unless the original tenant Id is `adfs`.
 * @internal
 */
export function processMultiTenantRequest(
  tenantId?: string,
  getTokenOptions?: GetTokenOptions,
  additionallyAllowedTenantIds: string[] = []
): string | undefined {
  let resolvedTenantId: string | undefined;
  if (process.env.AZURE_IDENTITY_DISABLE_MULTITENANTAUTH) {
    resolvedTenantId = tenantId;
  } else if (tenantId === "adfs") {
    resolvedTenantId = tenantId;
  } else {
    resolvedTenantId = getTokenOptions?.tenantId ?? tenantId;
  }

  if (
    tenantId &&
    resolvedTenantId !== tenantId &&
    !additionallyAllowedTenantIds.includes("*") &&
    !additionallyAllowedTenantIds.includes(tenantId)
  ) {
    throw new Error(createConfigurationErrorMessage(tenantId));
  }

  return resolvedTenantId;
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
