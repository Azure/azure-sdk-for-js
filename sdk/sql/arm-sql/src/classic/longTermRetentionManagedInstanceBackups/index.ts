// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listByResourceGroupInstance,
  listByResourceGroupLocation,
  listByInstance,
  listByLocation,
  listByDatabase,
  $delete,
  get,
  listByResourceGroupDatabase,
  deleteByResourceGroup,
  getByResourceGroup,
} from "../../api/longTermRetentionManagedInstanceBackups/operations.js";
import type {
  LongTermRetentionManagedInstanceBackupsListByResourceGroupInstanceOptionalParams,
  LongTermRetentionManagedInstanceBackupsListByResourceGroupLocationOptionalParams,
  LongTermRetentionManagedInstanceBackupsListByInstanceOptionalParams,
  LongTermRetentionManagedInstanceBackupsListByLocationOptionalParams,
  LongTermRetentionManagedInstanceBackupsListByDatabaseOptionalParams,
  LongTermRetentionManagedInstanceBackupsDeleteOptionalParams,
  LongTermRetentionManagedInstanceBackupsGetOptionalParams,
  LongTermRetentionManagedInstanceBackupsListByResourceGroupDatabaseOptionalParams,
  LongTermRetentionManagedInstanceBackupsDeleteByResourceGroupOptionalParams,
  LongTermRetentionManagedInstanceBackupsGetByResourceGroupOptionalParams,
} from "../../api/longTermRetentionManagedInstanceBackups/options.js";
import type { ManagedInstanceLongTermRetentionBackup } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a LongTermRetentionManagedInstanceBackups operations. */
export interface LongTermRetentionManagedInstanceBackupsOperations {
  /** Lists the long term retention backups for a given managed instance. */
  listByResourceGroupInstance: (
    resourceGroupName: string,
    locationName: string,
    managedInstanceName: string,
    options?: LongTermRetentionManagedInstanceBackupsListByResourceGroupInstanceOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedInstanceLongTermRetentionBackup>;
  /** Lists the long term retention backups for managed databases in a given location. */
  listByResourceGroupLocation: (
    resourceGroupName: string,
    locationName: string,
    options?: LongTermRetentionManagedInstanceBackupsListByResourceGroupLocationOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedInstanceLongTermRetentionBackup>;
  /** Lists the long term retention backups for a given managed instance. */
  listByInstance: (
    locationName: string,
    managedInstanceName: string,
    options?: LongTermRetentionManagedInstanceBackupsListByInstanceOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedInstanceLongTermRetentionBackup>;
  /** Lists the long term retention backups for managed databases in a given location. */
  listByLocation: (
    locationName: string,
    options?: LongTermRetentionManagedInstanceBackupsListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedInstanceLongTermRetentionBackup>;
  /** Lists all long term retention backups for a managed database. */
  listByDatabase: (
    locationName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: LongTermRetentionManagedInstanceBackupsListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedInstanceLongTermRetentionBackup>;
  /** Deletes a long term retention backup. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    locationName: string,
    managedInstanceName: string,
    databaseName: string,
    backupName: string,
    options?: LongTermRetentionManagedInstanceBackupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    locationName: string,
    managedInstanceName: string,
    databaseName: string,
    backupName: string,
    options?: LongTermRetentionManagedInstanceBackupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    locationName: string,
    managedInstanceName: string,
    databaseName: string,
    backupName: string,
    options?: LongTermRetentionManagedInstanceBackupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Gets a long term retention backup for a managed database. */
  get: (
    locationName: string,
    managedInstanceName: string,
    databaseName: string,
    backupName: string,
    options?: LongTermRetentionManagedInstanceBackupsGetOptionalParams,
  ) => Promise<ManagedInstanceLongTermRetentionBackup>;
  /** Lists all long term retention backups for a managed database. */
  listByResourceGroupDatabase: (
    resourceGroupName: string,
    locationName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: LongTermRetentionManagedInstanceBackupsListByResourceGroupDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedInstanceLongTermRetentionBackup>;
  /** Deletes a long term retention backup. */
  deleteByResourceGroup: (
    resourceGroupName: string,
    locationName: string,
    managedInstanceName: string,
    databaseName: string,
    backupName: string,
    options?: LongTermRetentionManagedInstanceBackupsDeleteByResourceGroupOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteByResourceGroup instead */
  beginDeleteByResourceGroup: (
    resourceGroupName: string,
    locationName: string,
    managedInstanceName: string,
    databaseName: string,
    backupName: string,
    options?: LongTermRetentionManagedInstanceBackupsDeleteByResourceGroupOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteByResourceGroup instead */
  beginDeleteByResourceGroupAndWait: (
    resourceGroupName: string,
    locationName: string,
    managedInstanceName: string,
    databaseName: string,
    backupName: string,
    options?: LongTermRetentionManagedInstanceBackupsDeleteByResourceGroupOptionalParams,
  ) => Promise<void>;
  /** Gets a long term retention backup for a managed database. */
  getByResourceGroup: (
    resourceGroupName: string,
    locationName: string,
    managedInstanceName: string,
    databaseName: string,
    backupName: string,
    options?: LongTermRetentionManagedInstanceBackupsGetByResourceGroupOptionalParams,
  ) => Promise<ManagedInstanceLongTermRetentionBackup>;
}

function _getLongTermRetentionManagedInstanceBackups(context: SqlManagementContext) {
  return {
    listByResourceGroupInstance: (
      resourceGroupName: string,
      locationName: string,
      managedInstanceName: string,
      options?: LongTermRetentionManagedInstanceBackupsListByResourceGroupInstanceOptionalParams,
    ) =>
      listByResourceGroupInstance(
        context,
        resourceGroupName,
        locationName,
        managedInstanceName,
        options,
      ),
    listByResourceGroupLocation: (
      resourceGroupName: string,
      locationName: string,
      options?: LongTermRetentionManagedInstanceBackupsListByResourceGroupLocationOptionalParams,
    ) => listByResourceGroupLocation(context, resourceGroupName, locationName, options),
    listByInstance: (
      locationName: string,
      managedInstanceName: string,
      options?: LongTermRetentionManagedInstanceBackupsListByInstanceOptionalParams,
    ) => listByInstance(context, locationName, managedInstanceName, options),
    listByLocation: (
      locationName: string,
      options?: LongTermRetentionManagedInstanceBackupsListByLocationOptionalParams,
    ) => listByLocation(context, locationName, options),
    listByDatabase: (
      locationName: string,
      managedInstanceName: string,
      databaseName: string,
      options?: LongTermRetentionManagedInstanceBackupsListByDatabaseOptionalParams,
    ) => listByDatabase(context, locationName, managedInstanceName, databaseName, options),
    delete: (
      locationName: string,
      managedInstanceName: string,
      databaseName: string,
      backupName: string,
      options?: LongTermRetentionManagedInstanceBackupsDeleteOptionalParams,
    ) => $delete(context, locationName, managedInstanceName, databaseName, backupName, options),
    beginDelete: async (
      locationName: string,
      managedInstanceName: string,
      databaseName: string,
      backupName: string,
      options?: LongTermRetentionManagedInstanceBackupsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        locationName,
        managedInstanceName,
        databaseName,
        backupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      locationName: string,
      managedInstanceName: string,
      databaseName: string,
      backupName: string,
      options?: LongTermRetentionManagedInstanceBackupsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        locationName,
        managedInstanceName,
        databaseName,
        backupName,
        options,
      );
    },
    get: (
      locationName: string,
      managedInstanceName: string,
      databaseName: string,
      backupName: string,
      options?: LongTermRetentionManagedInstanceBackupsGetOptionalParams,
    ) => get(context, locationName, managedInstanceName, databaseName, backupName, options),
    listByResourceGroupDatabase: (
      resourceGroupName: string,
      locationName: string,
      managedInstanceName: string,
      databaseName: string,
      options?: LongTermRetentionManagedInstanceBackupsListByResourceGroupDatabaseOptionalParams,
    ) =>
      listByResourceGroupDatabase(
        context,
        resourceGroupName,
        locationName,
        managedInstanceName,
        databaseName,
        options,
      ),
    deleteByResourceGroup: (
      resourceGroupName: string,
      locationName: string,
      managedInstanceName: string,
      databaseName: string,
      backupName: string,
      options?: LongTermRetentionManagedInstanceBackupsDeleteByResourceGroupOptionalParams,
    ) =>
      deleteByResourceGroup(
        context,
        resourceGroupName,
        locationName,
        managedInstanceName,
        databaseName,
        backupName,
        options,
      ),
    beginDeleteByResourceGroup: async (
      resourceGroupName: string,
      locationName: string,
      managedInstanceName: string,
      databaseName: string,
      backupName: string,
      options?: LongTermRetentionManagedInstanceBackupsDeleteByResourceGroupOptionalParams,
    ) => {
      const poller = deleteByResourceGroup(
        context,
        resourceGroupName,
        locationName,
        managedInstanceName,
        databaseName,
        backupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteByResourceGroupAndWait: async (
      resourceGroupName: string,
      locationName: string,
      managedInstanceName: string,
      databaseName: string,
      backupName: string,
      options?: LongTermRetentionManagedInstanceBackupsDeleteByResourceGroupOptionalParams,
    ) => {
      return await deleteByResourceGroup(
        context,
        resourceGroupName,
        locationName,
        managedInstanceName,
        databaseName,
        backupName,
        options,
      );
    },
    getByResourceGroup: (
      resourceGroupName: string,
      locationName: string,
      managedInstanceName: string,
      databaseName: string,
      backupName: string,
      options?: LongTermRetentionManagedInstanceBackupsGetByResourceGroupOptionalParams,
    ) =>
      getByResourceGroup(
        context,
        resourceGroupName,
        locationName,
        managedInstanceName,
        databaseName,
        backupName,
        options,
      ),
  };
}

export function _getLongTermRetentionManagedInstanceBackupsOperations(
  context: SqlManagementContext,
): LongTermRetentionManagedInstanceBackupsOperations {
  return {
    ..._getLongTermRetentionManagedInstanceBackups(context),
  };
}
