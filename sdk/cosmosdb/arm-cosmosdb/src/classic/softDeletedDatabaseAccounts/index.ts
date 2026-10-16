// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import {
  purge,
  restore,
  listByResourceGroupAndLocation,
  listByLocation,
  get,
} from "../../api/softDeletedDatabaseAccounts/operations.js";
import type {
  SoftDeletedDatabaseAccountsPurgeOptionalParams,
  SoftDeletedDatabaseAccountsRestoreOptionalParams,
  SoftDeletedDatabaseAccountsListByResourceGroupAndLocationOptionalParams,
  SoftDeletedDatabaseAccountsListByLocationOptionalParams,
  SoftDeletedDatabaseAccountsGetOptionalParams,
} from "../../api/softDeletedDatabaseAccounts/options.js";
import type {
  SoftDeletedDatabaseAccountGetResult,
  SoftDeletedDatabaseAccountsListResult,
} from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SoftDeletedDatabaseAccounts operations. */
export interface SoftDeletedDatabaseAccountsOperations {
  /** Permanently deletes (purges) a soft-deleted Azure Cosmos DB database account. */
  purge: (
    resourceGroupName: string,
    location: string,
    accountName: string,
    options?: SoftDeletedDatabaseAccountsPurgeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use purge instead */
  beginPurge: (
    resourceGroupName: string,
    location: string,
    accountName: string,
    options?: SoftDeletedDatabaseAccountsPurgeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use purge instead */
  beginPurgeAndWait: (
    resourceGroupName: string,
    location: string,
    accountName: string,
    options?: SoftDeletedDatabaseAccountsPurgeOptionalParams,
  ) => Promise<void>;
  /** Restores a soft-deleted Azure Cosmos DB database account. */
  restore: (
    resourceGroupName: string,
    location: string,
    accountName: string,
    options?: SoftDeletedDatabaseAccountsRestoreOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use restore instead */
  beginRestore: (
    resourceGroupName: string,
    location: string,
    accountName: string,
    options?: SoftDeletedDatabaseAccountsRestoreOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use restore instead */
  beginRestoreAndWait: (
    resourceGroupName: string,
    location: string,
    accountName: string,
    options?: SoftDeletedDatabaseAccountsRestoreOptionalParams,
  ) => Promise<void>;
  /** Lists all the soft-deleted Azure Cosmos DB database accounts available under the given resource group and in a region. This call requires 'Microsoft.DocumentDB/locations/softDeletedDatabaseAccounts/read' permission. */
  listByResourceGroupAndLocation: (
    resourceGroupName: string,
    location: string,
    options?: SoftDeletedDatabaseAccountsListByResourceGroupAndLocationOptionalParams,
  ) => Promise<SoftDeletedDatabaseAccountsListResult>;
  /** Lists all the soft-deleted Azure Cosmos DB database accounts available under the subscription and in a region. This call requires 'Microsoft.DocumentDB/locations/softDeletedDatabaseAccounts/read' permission. */
  listByLocation: (
    location: string,
    options?: SoftDeletedDatabaseAccountsListByLocationOptionalParams,
  ) => Promise<SoftDeletedDatabaseAccountsListResult>;
  /** Retrieves the properties of a soft-deleted Azure Cosmos DB database account by location and accountName. This call requires 'Microsoft.DocumentDB/locations/softDeletedDatabaseAccounts/read' permission. */
  get: (
    resourceGroupName: string,
    location: string,
    accountName: string,
    options?: SoftDeletedDatabaseAccountsGetOptionalParams,
  ) => Promise<SoftDeletedDatabaseAccountGetResult>;
}

function _getSoftDeletedDatabaseAccounts(context: CosmosDBManagementContext) {
  return {
    purge: (
      resourceGroupName: string,
      location: string,
      accountName: string,
      options?: SoftDeletedDatabaseAccountsPurgeOptionalParams,
    ) => purge(context, resourceGroupName, location, accountName, options),
    beginPurge: async (
      resourceGroupName: string,
      location: string,
      accountName: string,
      options?: SoftDeletedDatabaseAccountsPurgeOptionalParams,
    ) => {
      const poller = purge(context, resourceGroupName, location, accountName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPurgeAndWait: async (
      resourceGroupName: string,
      location: string,
      accountName: string,
      options?: SoftDeletedDatabaseAccountsPurgeOptionalParams,
    ) => {
      return await purge(context, resourceGroupName, location, accountName, options);
    },
    restore: (
      resourceGroupName: string,
      location: string,
      accountName: string,
      options?: SoftDeletedDatabaseAccountsRestoreOptionalParams,
    ) => restore(context, resourceGroupName, location, accountName, options),
    beginRestore: async (
      resourceGroupName: string,
      location: string,
      accountName: string,
      options?: SoftDeletedDatabaseAccountsRestoreOptionalParams,
    ) => {
      const poller = restore(context, resourceGroupName, location, accountName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestoreAndWait: async (
      resourceGroupName: string,
      location: string,
      accountName: string,
      options?: SoftDeletedDatabaseAccountsRestoreOptionalParams,
    ) => {
      return await restore(context, resourceGroupName, location, accountName, options);
    },
    listByResourceGroupAndLocation: (
      resourceGroupName: string,
      location: string,
      options?: SoftDeletedDatabaseAccountsListByResourceGroupAndLocationOptionalParams,
    ) => listByResourceGroupAndLocation(context, resourceGroupName, location, options),
    listByLocation: (
      location: string,
      options?: SoftDeletedDatabaseAccountsListByLocationOptionalParams,
    ) => listByLocation(context, location, options),
    get: (
      resourceGroupName: string,
      location: string,
      accountName: string,
      options?: SoftDeletedDatabaseAccountsGetOptionalParams,
    ) => get(context, resourceGroupName, location, accountName, options),
  };
}

export function _getSoftDeletedDatabaseAccountsOperations(
  context: CosmosDBManagementContext,
): SoftDeletedDatabaseAccountsOperations {
  return {
    ..._getSoftDeletedDatabaseAccounts(context),
  };
}
