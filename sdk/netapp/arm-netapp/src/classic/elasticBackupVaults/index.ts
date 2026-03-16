// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import {
  listByElasticAccount,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/elasticBackupVaults/operations.js";
import type {
  ElasticBackupVaultsListByElasticAccountOptionalParams,
  ElasticBackupVaultsDeleteOptionalParams,
  ElasticBackupVaultsUpdateOptionalParams,
  ElasticBackupVaultsCreateOrUpdateOptionalParams,
  ElasticBackupVaultsGetOptionalParams,
} from "../../api/elasticBackupVaults/options.js";
import type { ElasticBackupVault, ElasticBackupVaultUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ElasticBackupVaults operations. */
export interface ElasticBackupVaultsOperations {
  /** List and describe all Elastic Backup Vaults in the elastic account. */
  listByElasticAccount: (
    resourceGroupName: string,
    accountName: string,
    options?: ElasticBackupVaultsListByElasticAccountOptionalParams,
  ) => PagedAsyncIterableIterator<ElasticBackupVault>;
  /** Delete the specified Elastic Backup Vault */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    backupVaultName: string,
    options?: ElasticBackupVaultsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Patch the specified NetApp Elastic Backup Vault */
  update: (
    resourceGroupName: string,
    accountName: string,
    backupVaultName: string,
    body: ElasticBackupVaultUpdate,
    options?: ElasticBackupVaultsUpdateOptionalParams,
  ) => PollerLike<OperationState<ElasticBackupVault>, ElasticBackupVault>;
  /** Create or update the specified Elastic Backup Vault in the Elastic NetApp account */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    backupVaultName: string,
    body: ElasticBackupVault,
    options?: ElasticBackupVaultsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ElasticBackupVault>, ElasticBackupVault>;
  /** Get the Elastic Backup Vault */
  get: (
    resourceGroupName: string,
    accountName: string,
    backupVaultName: string,
    options?: ElasticBackupVaultsGetOptionalParams,
  ) => Promise<ElasticBackupVault>;
}

function _getElasticBackupVaults(context: NetAppManagementContext) {
  return {
    listByElasticAccount: (
      resourceGroupName: string,
      accountName: string,
      options?: ElasticBackupVaultsListByElasticAccountOptionalParams,
    ) => listByElasticAccount(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      backupVaultName: string,
      options?: ElasticBackupVaultsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, backupVaultName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      backupVaultName: string,
      body: ElasticBackupVaultUpdate,
      options?: ElasticBackupVaultsUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, backupVaultName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      backupVaultName: string,
      body: ElasticBackupVault,
      options?: ElasticBackupVaultsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, accountName, backupVaultName, body, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      backupVaultName: string,
      options?: ElasticBackupVaultsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, backupVaultName, options),
  };
}

export function _getElasticBackupVaultsOperations(
  context: NetAppManagementContext,
): ElasticBackupVaultsOperations {
  return {
    ..._getElasticBackupVaults(context),
  };
}
