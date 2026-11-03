// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { list } from "../../api/restorableGremlinGraphs/operations.js";
import type { RestorableGremlinGraphsListOptionalParams } from "../../api/restorableGremlinGraphs/options.js";
import type { RestorableGremlinGraphGetResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RestorableGremlinGraphs operations. */
export interface RestorableGremlinGraphsOperations {
  /** Show the event feed of all mutations done on all the Azure Cosmos DB Gremlin graphs under a specific database. This helps in scenario where container was accidentally deleted. This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission */
  list: (
    location: string,
    instanceId: string,
    options?: RestorableGremlinGraphsListOptionalParams,
  ) => PagedAsyncIterableIterator<RestorableGremlinGraphGetResult>;
}

function _getRestorableGremlinGraphs(context: CosmosDBManagementContext) {
  return {
    list: (
      location: string,
      instanceId: string,
      options?: RestorableGremlinGraphsListOptionalParams,
    ) => list(context, location, instanceId, options),
  };
}

export function _getRestorableGremlinGraphsOperations(
  context: CosmosDBManagementContext,
): RestorableGremlinGraphsOperations {
  return {
    ..._getRestorableGremlinGraphs(context),
  };
}
