// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { list } from "../../api/restorableGremlinResources/operations.js";
import type { RestorableGremlinResourcesListOptionalParams } from "../../api/restorableGremlinResources/options.js";
import type { RestorableGremlinResourcesGetResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RestorableGremlinResources operations. */
export interface RestorableGremlinResourcesOperations {
  /** Return a list of gremlin database and graphs combo that exist on the account at the given timestamp and location. This helps in scenarios to validate what resources exist at given timestamp and location. This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission. */
  list: (
    location: string,
    instanceId: string,
    options?: RestorableGremlinResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<RestorableGremlinResourcesGetResult>;
}

function _getRestorableGremlinResources(context: CosmosDBManagementContext) {
  return {
    list: (
      location: string,
      instanceId: string,
      options?: RestorableGremlinResourcesListOptionalParams,
    ) => list(context, location, instanceId, options),
  };
}

export function _getRestorableGremlinResourcesOperations(
  context: CosmosDBManagementContext,
): RestorableGremlinResourcesOperations {
  return {
    ..._getRestorableGremlinResources(context),
  };
}
