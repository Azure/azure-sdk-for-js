// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { get } from "../../api/recoveryPointFromDppCrossTenantVault/operations.js";
import type { RecoveryPointFromDppCrossTenantVaultGetOptionalParams } from "../../api/recoveryPointFromDppCrossTenantVault/options.js";
import type { AzureBackupRecoveryPointResource } from "../../models/models.js";

/** Interface representing a RecoveryPointFromDppCrossTenantVault operations. */
export interface RecoveryPointFromDppCrossTenantVaultOperations {
  /** Gets a vault-tier recovery point for a backup instance of the mapped source vault in a different tenant. */
  get: (
    resourceGroupName: string,
    vaultName: string,
    mappingName: string,
    backupInstanceName: string,
    recoveryPointId: string,
    options?: RecoveryPointFromDppCrossTenantVaultGetOptionalParams,
  ) => Promise<AzureBackupRecoveryPointResource>;
}

function _getRecoveryPointFromDppCrossTenantVault(context: DataProtectionContext) {
  return {
    get: (
      resourceGroupName: string,
      vaultName: string,
      mappingName: string,
      backupInstanceName: string,
      recoveryPointId: string,
      options?: RecoveryPointFromDppCrossTenantVaultGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        vaultName,
        mappingName,
        backupInstanceName,
        recoveryPointId,
        options,
      ),
  };
}

export function _getRecoveryPointFromDppCrossTenantVaultOperations(
  context: DataProtectionContext,
): RecoveryPointFromDppCrossTenantVaultOperations {
  return {
    ..._getRecoveryPointFromDppCrossTenantVault(context),
  };
}
