// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DeveloperSignOnClientId } from "../constants";
import { checkTenantId } from "./checkTenantId";
import { CredentialLogger } from "./logging";

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
