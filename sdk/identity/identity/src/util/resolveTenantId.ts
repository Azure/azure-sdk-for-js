// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CredentialLogger } from "./logging";
import { DeveloperSignOnClientId } from "../constants";
import { checkTenantId } from "./checkTenantId";

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
