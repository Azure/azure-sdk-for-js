// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { get } from "../../api/backupInstanceFromDppCrossTenantVault/operations.js";
import type { BackupInstanceFromDppCrossTenantVaultGetOptionalParams } from "../../api/backupInstanceFromDppCrossTenantVault/options.js";
import type { CrossTenantBackupInstanceResource } from "../../models/models.js";

/** Interface representing a BackupInstanceFromDppCrossTenantVault operations. */
export interface BackupInstanceFromDppCrossTenantVaultOperations {
  /** Gets a backup instance of the mapped source vault in a different tenant. */
  get: (
    resourceGroupName: string,
    vaultName: string,
    mappingName: string,
    backupInstanceName: string,
    options?: BackupInstanceFromDppCrossTenantVaultGetOptionalParams,
  ) => Promise<CrossTenantBackupInstanceResource>;
}

function _getBackupInstanceFromDppCrossTenantVault(context: DataProtectionContext) {
  return {
    get: (
      resourceGroupName: string,
      vaultName: string,
      mappingName: string,
      backupInstanceName: string,
      options?: BackupInstanceFromDppCrossTenantVaultGetOptionalParams,
    ) => get(context, resourceGroupName, vaultName, mappingName, backupInstanceName, options),
  };
}

export function _getBackupInstanceFromDppCrossTenantVaultOperations(
  context: DataProtectionContext,
): BackupInstanceFromDppCrossTenantVaultOperations {
  return {
    ..._getBackupInstanceFromDppCrossTenantVault(context),
  };
}
