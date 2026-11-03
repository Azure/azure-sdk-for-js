// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { list } from "../../api/backupUsageSummaries/operations.js";
import type { BackupUsageSummariesListOptionalParams } from "../../api/backupUsageSummaries/options.js";
import type { BackupManagementUsage } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a BackupUsageSummaries operations. */
export interface BackupUsageSummariesOperations {
  /** Fetches the backup management usage summaries of the vault. */
  list: (
    vaultName: string,
    resourceGroupName: string,
    options?: BackupUsageSummariesListOptionalParams,
  ) => PagedAsyncIterableIterator<BackupManagementUsage>;
}

function _getBackupUsageSummaries(context: RecoveryServicesBackupContext) {
  return {
    list: (
      vaultName: string,
      resourceGroupName: string,
      options?: BackupUsageSummariesListOptionalParams,
    ) => list(context, vaultName, resourceGroupName, options),
  };
}

export function _getBackupUsageSummariesOperations(
  context: RecoveryServicesBackupContext,
): BackupUsageSummariesOperations {
  return {
    ..._getBackupUsageSummaries(context),
  };
}
