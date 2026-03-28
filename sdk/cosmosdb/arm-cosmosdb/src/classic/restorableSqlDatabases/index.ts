// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { list } from "../../api/restorableSqlDatabases/operations.js";
import type { RestorableSqlDatabasesListOptionalParams } from "../../api/restorableSqlDatabases/options.js";
import type { RestorableSqlDatabaseGetResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RestorableSqlDatabases operations. */
export interface RestorableSqlDatabasesOperations {
  /** Show the event feed of all mutations done on all the Azure Cosmos DB SQL databases under the restorable account.  This helps in scenario where database was accidentally deleted to get the deletion time.  This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission */
  list: (
    location: string,
    instanceId: string,
    options?: RestorableSqlDatabasesListOptionalParams,
  ) => PagedAsyncIterableIterator<RestorableSqlDatabaseGetResult>;
}

function _getRestorableSqlDatabases(context: CosmosDBManagementContext) {
  return {
    list: (
      location: string,
      instanceId: string,
      options?: RestorableSqlDatabasesListOptionalParams,
    ) => list(context, location, instanceId, options),
  };
}

export function _getRestorableSqlDatabasesOperations(
  context: CosmosDBManagementContext,
): RestorableSqlDatabasesOperations {
  return {
    ..._getRestorableSqlDatabases(context),
  };
}
