// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { get } from "../../api/backupInstanceOperationStatusFromDppCrossTenantVault/operations.js";
import type { BackupInstanceOperationStatusFromDppCrossTenantVaultGetOptionalParams } from "../../api/backupInstanceOperationStatusFromDppCrossTenantVault/options.js";
import type { OperationResource } from "../../models/models.js";

/** Interface representing a BackupInstanceOperationStatusFromDppCrossTenantVault operations. */
export interface BackupInstanceOperationStatusFromDppCrossTenantVaultOperations {
  /** Gets the status of a cross-tenant operation (e.g. a cross-tenant restore) for a backup instance of the mapped source vault. */
  get: (
    resourceGroupName: string,
    vaultName: string,
    mappingName: string,
    backupInstanceName: string,
    operationId: string,
    options?: BackupInstanceOperationStatusFromDppCrossTenantVaultGetOptionalParams,
  ) => Promise<OperationResource>;
}

function _getBackupInstanceOperationStatusFromDppCrossTenantVault(context: DataProtectionContext) {
  return {
    get: (
      resourceGroupName: string,
      vaultName: string,
      mappingName: string,
      backupInstanceName: string,
      operationId: string,
      options?: BackupInstanceOperationStatusFromDppCrossTenantVaultGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        vaultName,
        mappingName,
        backupInstanceName,
        operationId,
        options,
      ),
  };
}

export function _getBackupInstanceOperationStatusFromDppCrossTenantVaultOperations(
  context: DataProtectionContext,
): BackupInstanceOperationStatusFromDppCrossTenantVaultOperations {
  return {
    ..._getBackupInstanceOperationStatusFromDppCrossTenantVault(context),
  };
}
