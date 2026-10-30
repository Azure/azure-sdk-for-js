// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import {
  listByReplicationMigrationItems,
  get,
} from "../../api/migrationRecoveryPoints/operations.js";
import type {
  MigrationRecoveryPointsListByReplicationMigrationItemsOptionalParams,
  MigrationRecoveryPointsGetOptionalParams,
} from "../../api/migrationRecoveryPoints/options.js";
import type { MigrationRecoveryPoint } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a MigrationRecoveryPoints operations. */
export interface MigrationRecoveryPointsOperations {
  /** Gets the recovery points for a migration item. */
  listByReplicationMigrationItems: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    options?: MigrationRecoveryPointsListByReplicationMigrationItemsOptionalParams,
  ) => PagedAsyncIterableIterator<MigrationRecoveryPoint>;
  /** Gets a recovery point for a migration item. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    migrationRecoveryPointName: string,
    options?: MigrationRecoveryPointsGetOptionalParams,
  ) => Promise<MigrationRecoveryPoint>;
}

function _getMigrationRecoveryPoints(context: SiteRecoveryManagementContext) {
  return {
    listByReplicationMigrationItems: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      options?: MigrationRecoveryPointsListByReplicationMigrationItemsOptionalParams,
    ) =>
      listByReplicationMigrationItems(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        options,
      ),
    get: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      migrationRecoveryPointName: string,
      options?: MigrationRecoveryPointsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        migrationRecoveryPointName,
        options,
      ),
  };
}

export function _getMigrationRecoveryPointsOperations(
  context: SiteRecoveryManagementContext,
): MigrationRecoveryPointsOperations {
  return {
    ..._getMigrationRecoveryPoints(context),
  };
}
