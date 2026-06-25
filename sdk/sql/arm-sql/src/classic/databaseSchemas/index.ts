// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { listByDatabase, get } from "../../api/databaseSchemas/operations.js";
import {
  DatabaseSchemasListByDatabaseOptionalParams,
  DatabaseSchemasGetOptionalParams,
} from "../../api/databaseSchemas/options.js";
import { DatabaseSchema } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DatabaseSchemas operations. */
export interface DatabaseSchemasOperations {
  /** List database schemas */
  listByDatabase: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabaseSchemasListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<DatabaseSchema>;
  /** Get database schema */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    schemaName: string,
    options?: DatabaseSchemasGetOptionalParams,
  ) => Promise<DatabaseSchema>;
}

function _getDatabaseSchemas(context: SqlManagementContext) {
  return {
    listByDatabase: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabaseSchemasListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, serverName, databaseName, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      schemaName: string,
      options?: DatabaseSchemasGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, databaseName, schemaName, options),
  };
}

export function _getDatabaseSchemasOperations(
  context: SqlManagementContext,
): DatabaseSchemasOperations {
  return {
    ..._getDatabaseSchemas(context),
  };
}
