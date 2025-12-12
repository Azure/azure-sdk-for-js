// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import {
  listByVault,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/elasticBackups/operations.js";
import type {
  ElasticBackupsListByVaultOptionalParams,
  ElasticBackupsDeleteOptionalParams,
  ElasticBackupsUpdateOptionalParams,
  ElasticBackupsCreateOrUpdateOptionalParams,
  ElasticBackupsGetOptionalParams,
} from "../../api/elasticBackups/options.js";
import type { ElasticBackup } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ElasticBackups operations. */
export interface ElasticBackupsOperations {
  /** List all elastic backups Under an elastic Backup Vault */
  listByVault: (
    resourceGroupName: string,
    accountName: string,
    backupVaultName: string,
    options?: ElasticBackupsListByVaultOptionalParams,
  ) => PagedAsyncIterableIterator<ElasticBackup>;
  /** Delete a ElasticBackup */
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
    options?: ElasticBackupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Patch an elastic Backup under the Elastic Backup Vault */
  update: (
    resourceGroupName: string,
    accountName: string,
    backupVaultName: string,
    backupName: string,
    body: ElasticBackup,
    options?: ElasticBackupsUpdateOptionalParams,
  ) => PollerLike<OperationState<ElasticBackup>, ElasticBackup>;
  /** Create an elastic backup under the elastic Backup Vault */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    backupVaultName: string,
    backupName: string,
    body: ElasticBackup,
    options?: ElasticBackupsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ElasticBackup>, ElasticBackup>;
  /** Get the specified Elastic Backup under Elastic Backup Vault. */
  get: (
    resourceGroupName: string,
    accountName: string,
    backupVaultName: string,
    backupName: string,
    options?: ElasticBackupsGetOptionalParams,
  ) => Promise<ElasticBackup>;
}

function _getElasticBackups(context: NetAppManagementContext) {
  return {
    listByVault: (
      resourceGroupName: string,
      accountName: string,
      backupVaultName: string,
      options?: ElasticBackupsListByVaultOptionalParams,
    ) => listByVault(context, resourceGroupName, accountName, backupVaultName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      backupVaultName: string,
      backupName: string,
      options?: ElasticBackupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, backupVaultName, backupName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      backupVaultName: string,
      backupName: string,
      body: ElasticBackup,
      options?: ElasticBackupsUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, accountName, backupVaultName, backupName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      backupVaultName: string,
      backupName: string,
      body: ElasticBackup,
      options?: ElasticBackupsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        backupVaultName,
        backupName,
        body,
        options,
      ),
    get: (
      resourceGroupName: string,
      accountName: string,
      backupVaultName: string,
      backupName: string,
      options?: ElasticBackupsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, backupVaultName, backupName, options),
  };
}

export function _getElasticBackupsOperations(
  context: NetAppManagementContext,
): ElasticBackupsOperations {
  return {
    ..._getElasticBackups(context),
  };
}
