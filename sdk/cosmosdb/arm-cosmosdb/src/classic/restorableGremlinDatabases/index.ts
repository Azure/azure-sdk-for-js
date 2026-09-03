// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { list } from "../../api/restorableGremlinDatabases/operations.js";
import type { RestorableGremlinDatabasesListOptionalParams } from "../../api/restorableGremlinDatabases/options.js";
import type { RestorableGremlinDatabaseGetResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RestorableGremlinDatabases operations. */
export interface RestorableGremlinDatabasesOperations {
  /** Show the event feed of all mutations done on all the Azure Cosmos DB Gremlin databases under the restorable account. This helps in scenario where database was accidentally deleted to get the deletion time. This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission */
  list: (
    location: string,
    instanceId: string,
    options?: RestorableGremlinDatabasesListOptionalParams,
  ) => PagedAsyncIterableIterator<RestorableGremlinDatabaseGetResult>;
}

function _getRestorableGremlinDatabases(context: CosmosDBManagementContext) {
  return {
    list: (
      location: string,
      instanceId: string,
      options?: RestorableGremlinDatabasesListOptionalParams,
    ) => list(context, location, instanceId, options),
  };
}

export function _getRestorableGremlinDatabasesOperations(
  context: CosmosDBManagementContext,
): RestorableGremlinDatabasesOperations {
  return {
    ..._getRestorableGremlinDatabases(context),
  };
}
