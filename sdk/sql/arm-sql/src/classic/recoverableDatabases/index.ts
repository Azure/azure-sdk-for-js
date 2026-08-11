// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { listByServer, get } from "../../api/recoverableDatabases/operations.js";
import type {
  RecoverableDatabasesListByServerOptionalParams,
  RecoverableDatabasesGetOptionalParams,
} from "../../api/recoverableDatabases/options.js";
import type { RecoverableDatabase } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RecoverableDatabases operations. */
export interface RecoverableDatabasesOperations {
  /** Gets a list of recoverable databases. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: RecoverableDatabasesListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<RecoverableDatabase>;
  /** Gets a recoverable database. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: RecoverableDatabasesGetOptionalParams,
  ) => Promise<RecoverableDatabase>;
}

function _getRecoverableDatabases(context: SqlManagementContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: RecoverableDatabasesListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: RecoverableDatabasesGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, databaseName, options),
  };
}

export function _getRecoverableDatabasesOperations(
  context: SqlManagementContext,
): RecoverableDatabasesOperations {
  return {
    ..._getRecoverableDatabases(context),
  };
}
