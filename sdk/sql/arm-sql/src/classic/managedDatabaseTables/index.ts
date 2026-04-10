// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { listBySchema, get } from "../../api/managedDatabaseTables/operations.js";
import type {
  ManagedDatabaseTablesListBySchemaOptionalParams,
  ManagedDatabaseTablesGetOptionalParams,
} from "../../api/managedDatabaseTables/options.js";
import type { DatabaseTable } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ManagedDatabaseTables operations. */
export interface ManagedDatabaseTablesOperations {
  /** List managed database tables */
  listBySchema: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    schemaName: string,
    options?: ManagedDatabaseTablesListBySchemaOptionalParams,
  ) => PagedAsyncIterableIterator<DatabaseTable>;
  /** Get managed database table */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    schemaName: string,
    tableName: string,
    options?: ManagedDatabaseTablesGetOptionalParams,
  ) => Promise<DatabaseTable>;
}

function _getManagedDatabaseTables(context: SqlManagementContext) {
  return {
    listBySchema: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      schemaName: string,
      options?: ManagedDatabaseTablesListBySchemaOptionalParams,
    ) =>
      listBySchema(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        schemaName,
        options,
      ),
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      schemaName: string,
      tableName: string,
      options?: ManagedDatabaseTablesGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        schemaName,
        tableName,
        options,
      ),
  };
}

export function _getManagedDatabaseTablesOperations(
  context: SqlManagementContext,
): ManagedDatabaseTablesOperations {
  return {
    ..._getManagedDatabaseTables(context),
  };
}
