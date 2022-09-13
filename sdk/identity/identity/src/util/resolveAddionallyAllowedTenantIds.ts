// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ALL_TENANTS } from "../constants";

export function resolveAddionallyAllowedTenantIds(additionallyAllowedTenants?: string[]): string[] {
  if (!additionallyAllowedTenants || additionallyAllowedTenants.length === 0) {
    return [];
  }

  if (additionallyAllowedTenants.includes("*")) {
    return ALL_TENANTS;
  }

  return additionallyAllowedTenants;
}
