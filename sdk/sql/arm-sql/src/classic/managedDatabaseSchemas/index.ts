// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import { listByDatabase, get } from "../../api/managedDatabaseSchemas/operations.js";
import type {
  ManagedDatabaseSchemasListByDatabaseOptionalParams,
  ManagedDatabaseSchemasGetOptionalParams,
} from "../../api/managedDatabaseSchemas/options.js";
import type { DatabaseSchema } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ManagedDatabaseSchemas operations. */
export interface ManagedDatabaseSchemasOperations {
  /** List managed database schemas */
  listByDatabase: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: ManagedDatabaseSchemasListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<DatabaseSchema>;
  /** Get managed database schema */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    schemaName: string,
    options?: ManagedDatabaseSchemasGetOptionalParams,
  ) => Promise<DatabaseSchema>;
}

function _getManagedDatabaseSchemas(context: SqlContext) {
  return {
    listByDatabase: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      options?: ManagedDatabaseSchemasListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, managedInstanceName, databaseName, options),
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      schemaName: string,
      options?: ManagedDatabaseSchemasGetOptionalParams,
    ) => get(context, resourceGroupName, managedInstanceName, databaseName, schemaName, options),
  };
}

export function _getManagedDatabaseSchemasOperations(
  context: SqlContext,
): ManagedDatabaseSchemasOperations {
  return {
    ..._getManagedDatabaseSchemas(context),
  };
}
