// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { purge, restore, list, get } from "../../api/softDeletedSqlContainers/operations.js";
import {
  SoftDeletedSqlContainersPurgeOptionalParams,
  SoftDeletedSqlContainersRestoreOptionalParams,
  SoftDeletedSqlContainersListOptionalParams,
  SoftDeletedSqlContainersGetOptionalParams,
} from "../../api/softDeletedSqlContainers/options.js";
import {
  SoftDeletedSqlContainerGetResult,
  SoftDeletedSqlContainersListResult,
} from "../../models/models.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SoftDeletedSqlContainers operations. */
export interface SoftDeletedSqlContainersOperations {
  /** Permanently deletes a soft-deleted Azure Cosmos DB SQL container. */
  purge: (
    resourceGroupName: string,
    location: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    options?: SoftDeletedSqlContainersPurgeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use purge instead */
  beginPurge: (
    resourceGroupName: string,
    location: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    options?: SoftDeletedSqlContainersPurgeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use purge instead */
  beginPurgeAndWait: (
    resourceGroupName: string,
    location: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    options?: SoftDeletedSqlContainersPurgeOptionalParams,
  ) => Promise<void>;
  /** Restores a soft-deleted Azure Cosmos DB SQL container to active state. */
  restore: (
    resourceGroupName: string,
    location: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    options?: SoftDeletedSqlContainersRestoreOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use restore instead */
  beginRestore: (
    resourceGroupName: string,
    location: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    options?: SoftDeletedSqlContainersRestoreOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use restore instead */
  beginRestoreAndWait: (
    resourceGroupName: string,
    location: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    options?: SoftDeletedSqlContainersRestoreOptionalParams,
  ) => Promise<void>;
  /** Lists all the soft-deleted Azure Cosmos DB SQL containers under a soft-deleted SQL database. This call requires 'Microsoft.DocumentDB/locations/softDeletedDatabaseAccounts/softDeletedSqlDatabases/softDeletedSqlContainers/read' permission. */
  list: (
    resourceGroupName: string,
    location: string,
    accountName: string,
    databaseName: string,
    options?: SoftDeletedSqlContainersListOptionalParams,
  ) => Promise<SoftDeletedSqlContainersListResult>;
  /** Retrieves the properties of a soft-deleted Azure Cosmos DB SQL container. This call requires 'Microsoft.DocumentDB/locations/softDeletedDatabaseAccounts/softDeletedSqlDatabases/softDeletedSqlContainers/read' permission. */
  get: (
    resourceGroupName: string,
    location: string,
    accountName: string,
    databaseName: string,
    containerName: string,
    options?: SoftDeletedSqlContainersGetOptionalParams,
  ) => Promise<SoftDeletedSqlContainerGetResult>;
}

function _getSoftDeletedSqlContainers(context: CosmosDBManagementContext) {
  return {
    purge: (
      resourceGroupName: string,
      location: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      options?: SoftDeletedSqlContainersPurgeOptionalParams,
    ) =>
      purge(
        context,
        resourceGroupName,
        location,
        accountName,
        databaseName,
        containerName,
        options,
      ),
    beginPurge: async (
      resourceGroupName: string,
      location: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      options?: SoftDeletedSqlContainersPurgeOptionalParams,
    ) => {
      const poller = purge(
        context,
        resourceGroupName,
        location,
        accountName,
        databaseName,
        containerName,
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
      containerName: string,
      options?: SoftDeletedSqlContainersPurgeOptionalParams,
    ) => {
      return await purge(
        context,
        resourceGroupName,
        location,
        accountName,
        databaseName,
        containerName,
        options,
      );
    },
    restore: (
      resourceGroupName: string,
      location: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      options?: SoftDeletedSqlContainersRestoreOptionalParams,
    ) =>
      restore(
        context,
        resourceGroupName,
        location,
        accountName,
        databaseName,
        containerName,
        options,
      ),
    beginRestore: async (
      resourceGroupName: string,
      location: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      options?: SoftDeletedSqlContainersRestoreOptionalParams,
    ) => {
      const poller = restore(
        context,
        resourceGroupName,
        location,
        accountName,
        databaseName,
        containerName,
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
      containerName: string,
      options?: SoftDeletedSqlContainersRestoreOptionalParams,
    ) => {
      return await restore(
        context,
        resourceGroupName,
        location,
        accountName,
        databaseName,
        containerName,
        options,
      );
    },
    list: (
      resourceGroupName: string,
      location: string,
      accountName: string,
      databaseName: string,
      options?: SoftDeletedSqlContainersListOptionalParams,
    ) => list(context, resourceGroupName, location, accountName, databaseName, options),
    get: (
      resourceGroupName: string,
      location: string,
      accountName: string,
      databaseName: string,
      containerName: string,
      options?: SoftDeletedSqlContainersGetOptionalParams,
    ) =>
      get(context, resourceGroupName, location, accountName, databaseName, containerName, options),
  };
}

export function _getSoftDeletedSqlContainersOperations(
  context: CosmosDBManagementContext,
): SoftDeletedSqlContainersOperations {
  return {
    ..._getSoftDeletedSqlContainers(context),
  };
}
