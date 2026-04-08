// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { listByDatabase } from "../../api/databaseUsages/operations.js";
import type { DatabaseUsagesListByDatabaseOptionalParams } from "../../api/databaseUsages/options.js";
import type { DatabaseUsage } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DatabaseUsages operations. */
export interface DatabaseUsagesOperations {
  /** Gets database usages. */
  listByDatabase: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabaseUsagesListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<DatabaseUsage>;
}

function _getDatabaseUsages(context: SqlManagementContext) {
  return {
    listByDatabase: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabaseUsagesListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, serverName, databaseName, options),
  };
}

export function _getDatabaseUsagesOperations(
  context: SqlManagementContext,
): DatabaseUsagesOperations {
  return {
    ..._getDatabaseUsages(context),
  };
}
