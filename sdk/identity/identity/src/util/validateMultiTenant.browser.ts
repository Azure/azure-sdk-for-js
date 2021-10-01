// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GetTokenOptions } from "@azure/core-auth";

/**
 * @internal
 */
export const multiTenantADFSErrorMessage =
  "A new tenant Id can't be assigned through the GetTokenOptions when a credential has been originally configured to use the tenant `adfs`.";

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
  if (!getTokenOptions?.tenantId) {
    return tenantId;
  }
  if (tenantId === "adfs") {
    throw new Error(multiTenantADFSErrorMessage);
  }
  return getTokenOptions?.tenantId;
}
