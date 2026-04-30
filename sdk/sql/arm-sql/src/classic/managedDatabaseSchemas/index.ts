// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { listByDatabase, get } from "../../api/managedDatabaseSchemas/operations.js";
import {
  ManagedDatabaseSchemasListByDatabaseOptionalParams,
  ManagedDatabaseSchemasGetOptionalParams,
} from "../../api/managedDatabaseSchemas/options.js";
import { DatabaseSchema } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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

function _getManagedDatabaseSchemas(context: SqlManagementContext) {
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
  context: SqlManagementContext,
): ManagedDatabaseSchemasOperations {
  return {
    ..._getManagedDatabaseSchemas(context),
  };
}
