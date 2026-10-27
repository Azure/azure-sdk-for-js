// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import { restoreFiles } from "../../api/backupsUnderBackupVault/operations.js";
import type { BackupsUnderBackupVaultRestoreFilesOptionalParams } from "../../api/backupsUnderBackupVault/options.js";
import type { BackupRestoreFiles } from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BackupsUnderBackupVault operations. */
export interface BackupsUnderBackupVaultOperations {
  /** Restore the specified files from the specified backup to the active filesystem */
  restoreFiles: (
    resourceGroupName: string,
    accountName: string,
    backupVaultName: string,
    backupName: string,
    body: BackupRestoreFiles,
    options?: BackupsUnderBackupVaultRestoreFilesOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
}

function _getBackupsUnderBackupVault(context: NetAppManagementContext) {
  return {
    restoreFiles: (
      resourceGroupName: string,
      accountName: string,
      backupVaultName: string,
      backupName: string,
      body: BackupRestoreFiles,
      options?: BackupsUnderBackupVaultRestoreFilesOptionalParams,
    ) =>
      restoreFiles(
        context,
        resourceGroupName,
        accountName,
        backupVaultName,
        backupName,
        body,
        options,
      ),
  };
}

export function _getBackupsUnderBackupVaultOperations(
  context: NetAppManagementContext,
): BackupsUnderBackupVaultOperations {
  return {
    ..._getBackupsUnderBackupVault(context),
  };
}
