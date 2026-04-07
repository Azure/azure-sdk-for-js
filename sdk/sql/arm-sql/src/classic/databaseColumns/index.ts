// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import { listByDatabase, listByTable, get } from "../../api/databaseColumns/operations.js";
import type {
  DatabaseColumnsListByDatabaseOptionalParams,
  DatabaseColumnsListByTableOptionalParams,
  DatabaseColumnsGetOptionalParams,
} from "../../api/databaseColumns/options.js";
import type { DatabaseColumn } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DatabaseColumns operations. */
export interface DatabaseColumnsOperations {
  /** List database columns */
  listByDatabase: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabaseColumnsListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<DatabaseColumn>;
  /** List database columns */
  listByTable: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    schemaName: string,
    tableName: string,
    options?: DatabaseColumnsListByTableOptionalParams,
  ) => PagedAsyncIterableIterator<DatabaseColumn>;
  /** Get database column */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    schemaName: string,
    tableName: string,
    columnName: string,
    options?: DatabaseColumnsGetOptionalParams,
  ) => Promise<DatabaseColumn>;
}

function _getDatabaseColumns(context: SqlContext) {
  return {
    listByDatabase: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabaseColumnsListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, serverName, databaseName, options),
    listByTable: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      schemaName: string,
      tableName: string,
      options?: DatabaseColumnsListByTableOptionalParams,
    ) =>
      listByTable(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        schemaName,
        tableName,
        options,
      ),
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      schemaName: string,
      tableName: string,
      columnName: string,
      options?: DatabaseColumnsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        schemaName,
        tableName,
        columnName,
        options,
      ),
  };
}

export function _getDatabaseColumnsOperations(context: SqlContext): DatabaseColumnsOperations {
  return {
    ..._getDatabaseColumns(context),
  };
}
