// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import { listByServer, get } from "../../api/restorableDroppedDatabases/operations.js";
import type {
  RestorableDroppedDatabasesListByServerOptionalParams,
  RestorableDroppedDatabasesGetOptionalParams,
} from "../../api/restorableDroppedDatabases/options.js";
import type { RestorableDroppedDatabase } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RestorableDroppedDatabases operations. */
export interface RestorableDroppedDatabasesOperations {
  /** Gets a list of restorable dropped databases. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: RestorableDroppedDatabasesListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<RestorableDroppedDatabase>;
  /** Gets a restorable dropped database. */
  get: (
    resourceGroupName: string,
    serverName: string,
    restorableDroppedDatabaseId: string,
    options?: RestorableDroppedDatabasesGetOptionalParams,
  ) => Promise<RestorableDroppedDatabase>;
}

function _getRestorableDroppedDatabases(context: SqlContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: RestorableDroppedDatabasesListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      restorableDroppedDatabaseId: string,
      options?: RestorableDroppedDatabasesGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, restorableDroppedDatabaseId, options),
  };
}

export function _getRestorableDroppedDatabasesOperations(
  context: SqlContext,
): RestorableDroppedDatabasesOperations {
  return {
    ..._getRestorableDroppedDatabases(context),
  };
}
