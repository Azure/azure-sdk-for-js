// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import { migrateBackups } from "../../api/backupsUnderAccount/operations.js";
import { BackupsUnderAccountMigrateBackupsOptionalParams } from "../../api/backupsUnderAccount/options.js";
import { BackupsMigrationRequest } from "../../models/models.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BackupsUnderAccount operations. */
export interface BackupsUnderAccountOperations {
  /** Migrate the backups under a NetApp account to backup vault */
  migrateBackups: (
    resourceGroupName: string,
    accountName: string,
    body: BackupsMigrationRequest,
    options?: BackupsUnderAccountMigrateBackupsOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
}

function _getBackupsUnderAccount(context: NetAppManagementContext) {
  return {
    migrateBackups: (
      resourceGroupName: string,
      accountName: string,
      body: BackupsMigrationRequest,
      options?: BackupsUnderAccountMigrateBackupsOptionalParams,
    ) => migrateBackups(context, resourceGroupName, accountName, body, options),
  };
}

export function _getBackupsUnderAccountOperations(
  context: NetAppManagementContext,
): BackupsUnderAccountOperations {
  return {
    ..._getBackupsUnderAccount(context),
  };
}
