// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { list } from "../../api/backupInstancesFromDppCrossTenantVault/operations.js";
import type { BackupInstancesFromDppCrossTenantVaultListOptionalParams } from "../../api/backupInstancesFromDppCrossTenantVault/options.js";
import type { CrossTenantBackupInstanceResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a BackupInstancesFromDppCrossTenantVault operations. */
export interface BackupInstancesFromDppCrossTenantVaultOperations {
  /** Lists the backup instances of the mapped source vault in a different tenant. */
  list: (
    resourceGroupName: string,
    vaultName: string,
    mappingName: string,
    options?: BackupInstancesFromDppCrossTenantVaultListOptionalParams,
  ) => PagedAsyncIterableIterator<CrossTenantBackupInstanceResource>;
}

function _getBackupInstancesFromDppCrossTenantVault(context: DataProtectionContext) {
  return {
    list: (
      resourceGroupName: string,
      vaultName: string,
      mappingName: string,
      options?: BackupInstancesFromDppCrossTenantVaultListOptionalParams,
    ) => list(context, resourceGroupName, vaultName, mappingName, options),
  };
}

export function _getBackupInstancesFromDppCrossTenantVaultOperations(
  context: DataProtectionContext,
): BackupInstancesFromDppCrossTenantVaultOperations {
  return {
    ..._getBackupInstancesFromDppCrossTenantVault(context),
  };
}
