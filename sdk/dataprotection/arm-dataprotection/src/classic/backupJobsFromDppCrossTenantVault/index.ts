// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { list } from "../../api/backupJobsFromDppCrossTenantVault/operations.js";
import type { BackupJobsFromDppCrossTenantVaultListOptionalParams } from "../../api/backupJobsFromDppCrossTenantVault/options.js";
import type { AzureBackupJobResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a BackupJobsFromDppCrossTenantVault operations. */
export interface BackupJobsFromDppCrossTenantVaultOperations {
  /** Lists the jobs of the mapped source vault in a different tenant. */
  list: (
    resourceGroupName: string,
    vaultName: string,
    mappingName: string,
    options?: BackupJobsFromDppCrossTenantVaultListOptionalParams,
  ) => PagedAsyncIterableIterator<AzureBackupJobResource>;
}

function _getBackupJobsFromDppCrossTenantVault(context: DataProtectionContext) {
  return {
    list: (
      resourceGroupName: string,
      vaultName: string,
      mappingName: string,
      options?: BackupJobsFromDppCrossTenantVaultListOptionalParams,
    ) => list(context, resourceGroupName, vaultName, mappingName, options),
  };
}

export function _getBackupJobsFromDppCrossTenantVaultOperations(
  context: DataProtectionContext,
): BackupJobsFromDppCrossTenantVaultOperations {
  return {
    ..._getBackupJobsFromDppCrossTenantVault(context),
  };
}
