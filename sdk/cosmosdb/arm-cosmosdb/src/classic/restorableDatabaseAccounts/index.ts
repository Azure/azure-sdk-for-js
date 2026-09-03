// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import {
  list,
  listByLocation,
  getByLocation,
} from "../../api/restorableDatabaseAccounts/operations.js";
import type {
  RestorableDatabaseAccountsListOptionalParams,
  RestorableDatabaseAccountsListByLocationOptionalParams,
  RestorableDatabaseAccountsGetByLocationOptionalParams,
} from "../../api/restorableDatabaseAccounts/options.js";
import type { RestorableDatabaseAccountGetResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RestorableDatabaseAccounts operations. */
export interface RestorableDatabaseAccountsOperations {
  /** Lists all the restorable Azure Cosmos DB database accounts available under the subscription. This call requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/read' permission. */
  list: (
    options?: RestorableDatabaseAccountsListOptionalParams,
  ) => PagedAsyncIterableIterator<RestorableDatabaseAccountGetResult>;
  /** Lists all the restorable Azure Cosmos DB database accounts available under the subscription and in a region.  This call requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/read' permission. */
  listByLocation: (
    location: string,
    options?: RestorableDatabaseAccountsListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<RestorableDatabaseAccountGetResult>;
  /** Retrieves the properties of an existing Azure Cosmos DB restorable database account.  This call requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/read/*' permission. */
  getByLocation: (
    location: string,
    instanceId: string,
    options?: RestorableDatabaseAccountsGetByLocationOptionalParams,
  ) => Promise<RestorableDatabaseAccountGetResult>;
}

function _getRestorableDatabaseAccounts(context: CosmosDBManagementContext) {
  return {
    list: (options?: RestorableDatabaseAccountsListOptionalParams) => list(context, options),
    listByLocation: (
      location: string,
      options?: RestorableDatabaseAccountsListByLocationOptionalParams,
    ) => listByLocation(context, location, options),
    getByLocation: (
      location: string,
      instanceId: string,
      options?: RestorableDatabaseAccountsGetByLocationOptionalParams,
    ) => getByLocation(context, location, instanceId, options),
  };
}

export function _getRestorableDatabaseAccountsOperations(
  context: CosmosDBManagementContext,
): RestorableDatabaseAccountsOperations {
  return {
    ..._getRestorableDatabaseAccounts(context),
  };
}
