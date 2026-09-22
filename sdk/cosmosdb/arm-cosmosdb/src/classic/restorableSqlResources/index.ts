// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { list } from "../../api/restorableSqlResources/operations.js";
import type { RestorableSqlResourcesListOptionalParams } from "../../api/restorableSqlResources/options.js";
import type { RestorableSqlResourcesGetResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RestorableSqlResources operations. */
export interface RestorableSqlResourcesOperations {
  /** Return a list of database and container combo that exist on the account at the given timestamp and location. This helps in scenarios to validate what resources exist at given timestamp and location. This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission. */
  list: (
    location: string,
    instanceId: string,
    options?: RestorableSqlResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<RestorableSqlResourcesGetResult>;
}

function _getRestorableSqlResources(context: CosmosDBManagementContext) {
  return {
    list: (
      location: string,
      instanceId: string,
      options?: RestorableSqlResourcesListOptionalParams,
    ) => list(context, location, instanceId, options),
  };
}

export function _getRestorableSqlResourcesOperations(
  context: CosmosDBManagementContext,
): RestorableSqlResourcesOperations {
  return {
    ..._getRestorableSqlResources(context),
  };
}
