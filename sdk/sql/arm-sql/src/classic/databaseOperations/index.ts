// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import { cancel, listByDatabase } from "../../api/databaseOperations/operations.js";
import type {
  DatabaseOperationsCancelOptionalParams,
  DatabaseOperationsListByDatabaseOptionalParams,
} from "../../api/databaseOperations/options.js";
import type { DatabaseOperation } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DatabaseOperations operations. */
export interface DatabaseOperationsOperations {
  /** Cancels the asynchronous operation on the database. */
  cancel: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    operationId: string,
    options?: DatabaseOperationsCancelOptionalParams,
  ) => Promise<void>;
  /** Gets a list of operations performed on the database. */
  listByDatabase: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabaseOperationsListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<DatabaseOperation>;
}

function _getDatabaseOperations(context: SqlContext) {
  return {
    cancel: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      operationId: string,
      options?: DatabaseOperationsCancelOptionalParams,
    ) => cancel(context, resourceGroupName, serverName, databaseName, operationId, options),
    listByDatabase: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabaseOperationsListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, serverName, databaseName, options),
  };
}

export function _getDatabaseOperationsOperations(
  context: SqlContext,
): DatabaseOperationsOperations {
  return {
    ..._getDatabaseOperations(context),
  };
}
