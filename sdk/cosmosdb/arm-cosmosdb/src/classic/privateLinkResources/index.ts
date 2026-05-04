// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { listByDatabaseAccount, get } from "../../api/privateLinkResources/operations.js";
import type {
  PrivateLinkResourcesListByDatabaseAccountOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "../../api/privateLinkResources/options.js";
import type { PrivateLinkResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** Gets the private link resources that need to be created for a Cosmos DB account. */
  listByDatabaseAccount: (
    resourceGroupName: string,
    accountName: string,
    options?: PrivateLinkResourcesListByDatabaseAccountOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
  /** Gets the private link resources that need to be created for a Cosmos DB account. */
  get: (
    resourceGroupName: string,
    accountName: string,
    groupName: string,
    options?: PrivateLinkResourcesGetOptionalParams,
  ) => Promise<PrivateLinkResource>;
}

function _getPrivateLinkResources(context: CosmosDBManagementContext) {
  return {
    listByDatabaseAccount: (
      resourceGroupName: string,
      accountName: string,
      options?: PrivateLinkResourcesListByDatabaseAccountOptionalParams,
    ) => listByDatabaseAccount(context, resourceGroupName, accountName, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      groupName: string,
      options?: PrivateLinkResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, groupName, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: CosmosDBManagementContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
