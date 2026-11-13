// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { get } from "../../api/backupInstanceOperationResultFromDppCrossTenantVault/operations.js";
import type { BackupInstanceOperationResultFromDppCrossTenantVaultGetOptionalParams } from "../../api/backupInstanceOperationResultFromDppCrossTenantVault/options.js";
import type { OperationJobExtendedInfo } from "../../models/models.js";

/** Interface representing a BackupInstanceOperationResultFromDppCrossTenantVault operations. */
export interface BackupInstanceOperationResultFromDppCrossTenantVaultOperations {
  /**
   * Fetches the result of a cross-tenant operation (e.g. a cross-tenant restore) for a backup instance of the
   * mapped source vault - the leg the restore's Location header points at. Returns 202 with Location/Retry-After
   * while pending, and 200 with the operation result body when complete.
   */
  get: (
    resourceGroupName: string,
    vaultName: string,
    mappingName: string,
    backupInstanceName: string,
    operationId: string,
    options?: BackupInstanceOperationResultFromDppCrossTenantVaultGetOptionalParams,
  ) => Promise<OperationJobExtendedInfo | void>;
}

function _getBackupInstanceOperationResultFromDppCrossTenantVault(context: DataProtectionContext) {
  return {
    get: (
      resourceGroupName: string,
      vaultName: string,
      mappingName: string,
      backupInstanceName: string,
      operationId: string,
      options?: BackupInstanceOperationResultFromDppCrossTenantVaultGetOptionalParams,
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

export function _getBackupInstanceOperationResultFromDppCrossTenantVaultOperations(
  context: DataProtectionContext,
): BackupInstanceOperationResultFromDppCrossTenantVaultOperations {
  return {
    ..._getBackupInstanceOperationResultFromDppCrossTenantVault(context),
  };
}
