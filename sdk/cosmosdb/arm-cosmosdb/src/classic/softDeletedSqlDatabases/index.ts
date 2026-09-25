// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { purge, restore, list, get } from "../../api/softDeletedSqlDatabases/operations.js";
import type {
  SoftDeletedSqlDatabasesPurgeOptionalParams,
  SoftDeletedSqlDatabasesRestoreOptionalParams,
  SoftDeletedSqlDatabasesListOptionalParams,
  SoftDeletedSqlDatabasesGetOptionalParams,
} from "../../api/softDeletedSqlDatabases/options.js";
import type {
  SoftDeletedSqlDatabaseGetResult,
  SoftDeletedSqlDatabasesListResult,
} from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SoftDeletedSqlDatabases operations. */
export interface SoftDeletedSqlDatabasesOperations {
  /** Permanently deletes a soft-deleted Azure Cosmos DB SQL database. */
  purge: (
    resourceGroupName: string,
    location: string,
    accountName: string,
    databaseName: string,
    options?: SoftDeletedSqlDatabasesPurgeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use purge instead */
  beginPurge: (
    resourceGroupName: string,
    location: string,
    accountName: string,
    databaseName: string,
    options?: SoftDeletedSqlDatabasesPurgeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use purge instead */
  beginPurgeAndWait: (
    resourceGroupName: string,
    location: string,
    accountName: string,
    databaseName: string,
    options?: SoftDeletedSqlDatabasesPurgeOptionalParams,
  ) => Promise<void>;
  /** Restores a soft-deleted Azure Cosmos DB SQL database. */
  restore: (
    resourceGroupName: string,
    location: string,
    accountName: string,
    databaseName: string,
    options?: SoftDeletedSqlDatabasesRestoreOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use restore instead */
  beginRestore: (
    resourceGroupName: string,
    location: string,
    accountName: string,
    databaseName: string,
    options?: SoftDeletedSqlDatabasesRestoreOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use restore instead */
  beginRestoreAndWait: (
    resourceGroupName: string,
    location: string,
    accountName: string,
    databaseName: string,
    options?: SoftDeletedSqlDatabasesRestoreOptionalParams,
  ) => Promise<void>;
  /** Lists all the soft-deleted Azure Cosmos DB SQL databases under a soft-deleted database account. This call requires 'Microsoft.DocumentDB/locations/softDeletedDatabaseAccounts/softDeletedSqlDatabases/read' permission. */
  list: (
    resourceGroupName: string,
    location: string,
    accountName: string,
    options?: SoftDeletedSqlDatabasesListOptionalParams,
  ) => Promise<SoftDeletedSqlDatabasesListResult>;
  /** Retrieves the properties of a soft-deleted Azure Cosmos DB SQL database. This call requires 'Microsoft.DocumentDB/locations/softDeletedDatabaseAccounts/softDeletedSqlDatabases/read' permission. */
  get: (
    resourceGroupName: string,
    location: string,
    accountName: string,
    databaseName: string,
    options?: SoftDeletedSqlDatabasesGetOptionalParams,
  ) => Promise<SoftDeletedSqlDatabaseGetResult>;
}

function _getSoftDeletedSqlDatabases(context: CosmosDBManagementContext) {
  return {
    purge: (
      resourceGroupName: string,
      location: string,
      accountName: string,
      databaseName: string,
      options?: SoftDeletedSqlDatabasesPurgeOptionalParams,
    ) => purge(context, resourceGroupName, location, accountName, databaseName, options),
    beginPurge: async (
      resourceGroupName: string,
      location: string,
      accountName: string,
      databaseName: string,
      options?: SoftDeletedSqlDatabasesPurgeOptionalParams,
    ) => {
      const poller = purge(
        context,
        resourceGroupName,
        location,
        accountName,
        databaseName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPurgeAndWait: async (
      resourceGroupName: string,
      location: string,
      accountName: string,
      databaseName: string,
      options?: SoftDeletedSqlDatabasesPurgeOptionalParams,
    ) => {
      return await purge(context, resourceGroupName, location, accountName, databaseName, options);
    },
    restore: (
      resourceGroupName: string,
      location: string,
      accountName: string,
      databaseName: string,
      options?: SoftDeletedSqlDatabasesRestoreOptionalParams,
    ) => restore(context, resourceGroupName, location, accountName, databaseName, options),
    beginRestore: async (
      resourceGroupName: string,
      location: string,
      accountName: string,
      databaseName: string,
      options?: SoftDeletedSqlDatabasesRestoreOptionalParams,
    ) => {
      const poller = restore(
        context,
        resourceGroupName,
        location,
        accountName,
        databaseName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestoreAndWait: async (
      resourceGroupName: string,
      location: string,
      accountName: string,
      databaseName: string,
      options?: SoftDeletedSqlDatabasesRestoreOptionalParams,
    ) => {
      return await restore(
        context,
        resourceGroupName,
        location,
        accountName,
        databaseName,
        options,
      );
    },
    list: (
      resourceGroupName: string,
      location: string,
      accountName: string,
      options?: SoftDeletedSqlDatabasesListOptionalParams,
    ) => list(context, resourceGroupName, location, accountName, options),
    get: (
      resourceGroupName: string,
      location: string,
      accountName: string,
      databaseName: string,
      options?: SoftDeletedSqlDatabasesGetOptionalParams,
    ) => get(context, resourceGroupName, location, accountName, databaseName, options),
  };
}

export function _getSoftDeletedSqlDatabasesOperations(
  context: CosmosDBManagementContext,
): SoftDeletedSqlDatabasesOperations {
  return {
    ..._getSoftDeletedSqlDatabases(context),
  };
}
