// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import { listBySchema, get } from "../../api/databaseTables/operations.js";
import type {
  DatabaseTablesListBySchemaOptionalParams,
  DatabaseTablesGetOptionalParams,
} from "../../api/databaseTables/options.js";
import type { DatabaseTable } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DatabaseTables operations. */
export interface DatabaseTablesOperations {
  /** List database tables */
  listBySchema: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    schemaName: string,
    options?: DatabaseTablesListBySchemaOptionalParams,
  ) => PagedAsyncIterableIterator<DatabaseTable>;
  /** Get database table */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    schemaName: string,
    tableName: string,
    options?: DatabaseTablesGetOptionalParams,
  ) => Promise<DatabaseTable>;
}

function _getDatabaseTables(context: SqlContext) {
  return {
    listBySchema: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      schemaName: string,
      options?: DatabaseTablesListBySchemaOptionalParams,
    ) => listBySchema(context, resourceGroupName, serverName, databaseName, schemaName, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      schemaName: string,
      tableName: string,
      options?: DatabaseTablesGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, databaseName, schemaName, tableName, options),
  };
}

export function _getDatabaseTablesOperations(context: SqlContext): DatabaseTablesOperations {
  return {
    ..._getDatabaseTables(context),
  };
}
