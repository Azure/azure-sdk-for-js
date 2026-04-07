// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import { listByDatabase, listByTable, get } from "../../api/managedDatabaseColumns/operations.js";
import type {
  ManagedDatabaseColumnsListByDatabaseOptionalParams,
  ManagedDatabaseColumnsListByTableOptionalParams,
  ManagedDatabaseColumnsGetOptionalParams,
} from "../../api/managedDatabaseColumns/options.js";
import type { DatabaseColumn } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ManagedDatabaseColumns operations. */
export interface ManagedDatabaseColumnsOperations {
  /** List managed database columns */
  listByDatabase: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: ManagedDatabaseColumnsListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<DatabaseColumn>;
  /** List managed database columns */
  listByTable: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    schemaName: string,
    tableName: string,
    options?: ManagedDatabaseColumnsListByTableOptionalParams,
  ) => PagedAsyncIterableIterator<DatabaseColumn>;
  /** Get managed database column */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    schemaName: string,
    tableName: string,
    columnName: string,
    options?: ManagedDatabaseColumnsGetOptionalParams,
  ) => Promise<DatabaseColumn>;
}

function _getManagedDatabaseColumns(context: SqlContext) {
  return {
    listByDatabase: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      options?: ManagedDatabaseColumnsListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, managedInstanceName, databaseName, options),
    listByTable: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      schemaName: string,
      tableName: string,
      options?: ManagedDatabaseColumnsListByTableOptionalParams,
    ) =>
      listByTable(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        schemaName,
        tableName,
        options,
      ),
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      schemaName: string,
      tableName: string,
      columnName: string,
      options?: ManagedDatabaseColumnsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        schemaName,
        tableName,
        columnName,
        options,
      ),
  };
}

export function _getManagedDatabaseColumnsOperations(
  context: SqlContext,
): ManagedDatabaseColumnsOperations {
  return {
    ..._getManagedDatabaseColumns(context),
  };
}
