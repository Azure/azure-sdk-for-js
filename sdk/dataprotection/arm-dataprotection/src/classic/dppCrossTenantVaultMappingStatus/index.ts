// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { check } from "../../api/dppCrossTenantVaultMappingStatus/operations.js";
import type { DppCrossTenantVaultMappingStatusCheckOptionalParams } from "../../api/dppCrossTenantVaultMappingStatus/options.js";
import type { CrossTenantVaultMappingStatusResponse } from "../../models/models.js";

/** Interface representing a DppCrossTenantVaultMappingStatus operations. */
export interface DppCrossTenantVaultMappingStatusOperations {
  /** Gets the status (Active/Inactive) of a cross-tenant vault mapping from the source vault side. */
  check: (
    resourceGroupName: string,
    vaultName: string,
    options?: DppCrossTenantVaultMappingStatusCheckOptionalParams,
  ) => Promise<CrossTenantVaultMappingStatusResponse>;
}

function _getDppCrossTenantVaultMappingStatus(context: DataProtectionContext) {
  return {
    check: (
      resourceGroupName: string,
      vaultName: string,
      options?: DppCrossTenantVaultMappingStatusCheckOptionalParams,
    ) => check(context, resourceGroupName, vaultName, options),
  };
}

export function _getDppCrossTenantVaultMappingStatusOperations(
  context: DataProtectionContext,
): DppCrossTenantVaultMappingStatusOperations {
  return {
    ..._getDppCrossTenantVaultMappingStatus(context),
  };
}
