// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { list } from "../../api/recoveryPointsFromDppCrossTenantVault/operations.js";
import type { RecoveryPointsFromDppCrossTenantVaultListOptionalParams } from "../../api/recoveryPointsFromDppCrossTenantVault/options.js";
import type { AzureBackupRecoveryPointResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RecoveryPointsFromDppCrossTenantVault operations. */
export interface RecoveryPointsFromDppCrossTenantVaultOperations {
  /** Lists the vault-tier recovery points for a backup instance of the mapped source vault in a different tenant. */
  list: (
    resourceGroupName: string,
    vaultName: string,
    mappingName: string,
    backupInstanceName: string,
    options?: RecoveryPointsFromDppCrossTenantVaultListOptionalParams,
  ) => PagedAsyncIterableIterator<AzureBackupRecoveryPointResource>;
}

function _getRecoveryPointsFromDppCrossTenantVault(context: DataProtectionContext) {
  return {
    list: (
      resourceGroupName: string,
      vaultName: string,
      mappingName: string,
      backupInstanceName: string,
      options?: RecoveryPointsFromDppCrossTenantVaultListOptionalParams,
    ) => list(context, resourceGroupName, vaultName, mappingName, backupInstanceName, options),
  };
}

export function _getRecoveryPointsFromDppCrossTenantVaultOperations(
  context: DataProtectionContext,
): RecoveryPointsFromDppCrossTenantVaultOperations {
  return {
    ..._getRecoveryPointsFromDppCrossTenantVault(context),
  };
}
