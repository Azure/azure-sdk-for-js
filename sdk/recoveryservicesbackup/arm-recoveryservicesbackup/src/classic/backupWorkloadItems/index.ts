// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { list } from "../../api/backupWorkloadItems/operations.js";
import type { BackupWorkloadItemsListOptionalParams } from "../../api/backupWorkloadItems/options.js";
import type { WorkloadItemResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a BackupWorkloadItems operations. */
export interface BackupWorkloadItemsOperations {
  /**
   * Provides a pageable list of workload item of a specific container according to the query filter and the pagination
   * parameters.
   */
  list: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    containerName: string,
    options?: BackupWorkloadItemsListOptionalParams,
  ) => PagedAsyncIterableIterator<WorkloadItemResource>;
}

function _getBackupWorkloadItems(context: RecoveryServicesBackupContext) {
  return {
    list: (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      containerName: string,
      options?: BackupWorkloadItemsListOptionalParams,
    ) => list(context, vaultName, resourceGroupName, fabricName, containerName, options),
  };
}

export function _getBackupWorkloadItemsOperations(
  context: RecoveryServicesBackupContext,
): BackupWorkloadItemsOperations {
  return {
    ..._getBackupWorkloadItems(context),
  };
}
