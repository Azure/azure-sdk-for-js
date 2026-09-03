// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { list } from "../../api/restorableMongodbDatabases/operations.js";
import type { RestorableMongodbDatabasesListOptionalParams } from "../../api/restorableMongodbDatabases/options.js";
import type { RestorableMongodbDatabaseGetResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RestorableMongodbDatabases operations. */
export interface RestorableMongodbDatabasesOperations {
  /** Show the event feed of all mutations done on all the Azure Cosmos DB MongoDB databases under the restorable account.  This helps in scenario where database was accidentally deleted to get the deletion time.  This API requires  'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission */
  list: (
    location: string,
    instanceId: string,
    options?: RestorableMongodbDatabasesListOptionalParams,
  ) => PagedAsyncIterableIterator<RestorableMongodbDatabaseGetResult>;
}

function _getRestorableMongodbDatabases(context: CosmosDBManagementContext) {
  return {
    list: (
      location: string,
      instanceId: string,
      options?: RestorableMongodbDatabasesListOptionalParams,
    ) => list(context, location, instanceId, options),
  };
}

export function _getRestorableMongodbDatabasesOperations(
  context: CosmosDBManagementContext,
): RestorableMongodbDatabasesOperations {
  return {
    ..._getRestorableMongodbDatabases(context),
  };
}
