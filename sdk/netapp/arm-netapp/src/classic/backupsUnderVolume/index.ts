// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import { migrateBackups } from "../../api/backupsUnderVolume/operations.js";
import type { BackupsUnderVolumeMigrateBackupsOptionalParams } from "../../api/backupsUnderVolume/options.js";
import type { BackupsMigrationRequest } from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BackupsUnderVolume operations. */
export interface BackupsUnderVolumeOperations {
  /** Migrate the backups under volume to backup vault */
  migrateBackups: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    body: BackupsMigrationRequest,
    options?: BackupsUnderVolumeMigrateBackupsOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
}

function _getBackupsUnderVolume(context: NetAppManagementContext) {
  return {
    migrateBackups: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      body: BackupsMigrationRequest,
      options?: BackupsUnderVolumeMigrateBackupsOptionalParams,
    ) =>
      migrateBackups(context, resourceGroupName, accountName, poolName, volumeName, body, options),
  };
}

export function _getBackupsUnderVolumeOperations(
  context: NetAppManagementContext,
): BackupsUnderVolumeOperations {
  return {
    ..._getBackupsUnderVolume(context),
  };
}
