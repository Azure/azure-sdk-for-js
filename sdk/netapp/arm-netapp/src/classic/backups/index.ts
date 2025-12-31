// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import {
  getVolumeLatestRestoreStatus,
  getLatestStatus,
  listByVault,
  $delete,
  update,
  create,
  get,
} from "../../api/backups/operations.js";
import type {
  BackupsGetVolumeLatestRestoreStatusOptionalParams,
  BackupsGetLatestStatusOptionalParams,
  BackupsListByVaultOptionalParams,
  BackupsDeleteOptionalParams,
  BackupsUpdateOptionalParams,
  BackupsCreateOptionalParams,
  BackupsGetOptionalParams,
} from "../../api/backups/options.js";
import type { Backup, BackupStatus, RestoreStatus } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Backups operations. */
export interface BackupsOperations {
  /** Get the latest status of the restore for a volume */
  getVolumeLatestRestoreStatus: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: BackupsGetVolumeLatestRestoreStatusOptionalParams,
  ) => Promise<RestoreStatus>;
  /** Get the latest status of the backup for a volume */
  getLatestStatus: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: BackupsGetLatestStatusOptionalParams,
  ) => Promise<BackupStatus>;
  /** List all backups Under a Backup Vault */
  listByVault: (
    resourceGroupName: string,
    accountName: string,
    backupVaultName: string,
    options?: BackupsListByVaultOptionalParams,
  ) => PagedAsyncIterableIterator<Backup>;
  /** Delete a Backup under the Backup Vault */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    backupVaultName: string,
    backupName: string,
    options?: BackupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Patch a Backup under the Backup Vault */
  update: (
    resourceGroupName: string,
    accountName: string,
    backupVaultName: string,
    backupName: string,
    options?: BackupsUpdateOptionalParams,
  ) => PollerLike<OperationState<Backup>, Backup>;
  /** Create a backup under the Backup Vault */
  create: (
    resourceGroupName: string,
    accountName: string,
    backupVaultName: string,
    backupName: string,
    body: Backup,
    options?: BackupsCreateOptionalParams,
  ) => PollerLike<OperationState<Backup>, Backup>;
  /** Get the specified Backup under Backup Vault. */
  get: (
    resourceGroupName: string,
    accountName: string,
    backupVaultName: string,
    backupName: string,
    options?: BackupsGetOptionalParams,
  ) => Promise<Backup>;
}

function _getBackups(context: NetAppManagementContext) {
  return {
    getVolumeLatestRestoreStatus: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      options?: BackupsGetVolumeLatestRestoreStatusOptionalParams,
    ) =>
      getVolumeLatestRestoreStatus(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        options,
      ),
    getLatestStatus: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      options?: BackupsGetLatestStatusOptionalParams,
    ) => getLatestStatus(context, resourceGroupName, accountName, poolName, volumeName, options),
    listByVault: (
      resourceGroupName: string,
      accountName: string,
      backupVaultName: string,
      options?: BackupsListByVaultOptionalParams,
    ) => listByVault(context, resourceGroupName, accountName, backupVaultName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      backupVaultName: string,
      backupName: string,
      options?: BackupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, backupVaultName, backupName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      backupVaultName: string,
      backupName: string,
      options?: BackupsUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, backupVaultName, backupName, options),
    create: (
      resourceGroupName: string,
      accountName: string,
      backupVaultName: string,
      backupName: string,
      body: Backup,
      options?: BackupsCreateOptionalParams,
    ) =>
      create(context, resourceGroupName, accountName, backupVaultName, backupName, body, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      backupVaultName: string,
      backupName: string,
      options?: BackupsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, backupVaultName, backupName, options),
  };
}

export function _getBackupsOperations(context: NetAppManagementContext): BackupsOperations {
  return {
    ..._getBackups(context),
  };
}
