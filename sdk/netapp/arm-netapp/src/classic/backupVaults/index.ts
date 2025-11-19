// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import {
  listByNetAppAccount,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/backupVaults/operations.js";
import {
  BackupVaultsListByNetAppAccountOptionalParams,
  BackupVaultsDeleteOptionalParams,
  BackupVaultsUpdateOptionalParams,
  BackupVaultsCreateOrUpdateOptionalParams,
  BackupVaultsGetOptionalParams,
} from "../../api/backupVaults/options.js";
import { BackupVault, BackupVaultPatch } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BackupVaults operations. */
export interface BackupVaultsOperations {
  /** List and describe all Backup Vaults in the NetApp account. */
  listByNetAppAccount: (
    resourceGroupName: string,
    accountName: string,
    options?: BackupVaultsListByNetAppAccountOptionalParams,
  ) => PagedAsyncIterableIterator<BackupVault>;
  /** Delete the specified Backup Vault */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    backupVaultName: string,
    options?: BackupVaultsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Patch the specified NetApp Backup Vault */
  update: (
    resourceGroupName: string,
    accountName: string,
    backupVaultName: string,
    body: BackupVaultPatch,
    options?: BackupVaultsUpdateOptionalParams,
  ) => PollerLike<OperationState<BackupVault>, BackupVault>;
  /** Create or update the specified Backup Vault in the NetApp account */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    backupVaultName: string,
    body: BackupVault,
    options?: BackupVaultsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BackupVault>, BackupVault>;
  /** Get the Backup Vault */
  get: (
    resourceGroupName: string,
    accountName: string,
    backupVaultName: string,
    options?: BackupVaultsGetOptionalParams,
  ) => Promise<BackupVault>;
}

function _getBackupVaults(context: NetAppManagementContext) {
  return {
    listByNetAppAccount: (
      resourceGroupName: string,
      accountName: string,
      options?: BackupVaultsListByNetAppAccountOptionalParams,
    ) => listByNetAppAccount(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      backupVaultName: string,
      options?: BackupVaultsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        accountName,
        backupVaultName,
        options,
      ),
    update: (
      resourceGroupName: string,
      accountName: string,
      backupVaultName: string,
      body: BackupVaultPatch,
      options?: BackupVaultsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        accountName,
        backupVaultName,
        body,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      backupVaultName: string,
      body: BackupVault,
      options?: BackupVaultsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        backupVaultName,
        body,
        options,
      ),
    get: (
      resourceGroupName: string,
      accountName: string,
      backupVaultName: string,
      options?: BackupVaultsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, backupVaultName, options),
  };
}

export function _getBackupVaultsOperations(
  context: NetAppManagementContext,
): BackupVaultsOperations {
  return {
    ..._getBackupVaults(context),
  };
}
