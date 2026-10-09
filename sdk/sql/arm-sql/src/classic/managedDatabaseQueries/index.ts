// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { listByQuery, get } from "../../api/managedDatabaseQueries/operations.js";
import type {
  ManagedDatabaseQueriesListByQueryOptionalParams,
  ManagedDatabaseQueriesGetOptionalParams,
} from "../../api/managedDatabaseQueries/options.js";
import type { ManagedInstanceQuery, QueryStatistics } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ManagedDatabaseQueries operations. */
export interface ManagedDatabaseQueriesOperations {
  /** Get query execution statistics by query id. */
  listByQuery: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    queryId: string,
    options?: ManagedDatabaseQueriesListByQueryOptionalParams,
  ) => PagedAsyncIterableIterator<QueryStatistics>;
  /** Get query by query id. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    queryId: string,
    options?: ManagedDatabaseQueriesGetOptionalParams,
  ) => Promise<ManagedInstanceQuery>;
}

function _getManagedDatabaseQueries(context: SqlManagementContext) {
  return {
    listByQuery: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      queryId: string,
      options?: ManagedDatabaseQueriesListByQueryOptionalParams,
    ) =>
      listByQuery(context, resourceGroupName, managedInstanceName, databaseName, queryId, options),
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      queryId: string,
      options?: ManagedDatabaseQueriesGetOptionalParams,
    ) => get(context, resourceGroupName, managedInstanceName, databaseName, queryId, options),
  };
}

export function _getManagedDatabaseQueriesOperations(
  context: SqlManagementContext,
): ManagedDatabaseQueriesOperations {
  return {
    ..._getManagedDatabaseQueries(context),
  };
}
