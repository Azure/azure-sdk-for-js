// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { listByInstance, get } from "../../api/recoverableManagedDatabases/operations.js";
import type {
  RecoverableManagedDatabasesListByInstanceOptionalParams,
  RecoverableManagedDatabasesGetOptionalParams,
} from "../../api/recoverableManagedDatabases/options.js";
import type { RecoverableManagedDatabase } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RecoverableManagedDatabases operations. */
export interface RecoverableManagedDatabasesOperations {
  /** Gets a list of recoverable managed databases. */
  listByInstance: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: RecoverableManagedDatabasesListByInstanceOptionalParams,
  ) => PagedAsyncIterableIterator<RecoverableManagedDatabase>;
  /** Gets a recoverable managed database. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    recoverableDatabaseName: string,
    options?: RecoverableManagedDatabasesGetOptionalParams,
  ) => Promise<RecoverableManagedDatabase>;
}

function _getRecoverableManagedDatabases(context: SqlManagementContext) {
  return {
    listByInstance: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: RecoverableManagedDatabasesListByInstanceOptionalParams,
    ) => listByInstance(context, resourceGroupName, managedInstanceName, options),
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      recoverableDatabaseName: string,
      options?: RecoverableManagedDatabasesGetOptionalParams,
    ) => get(context, resourceGroupName, managedInstanceName, recoverableDatabaseName, options),
  };
}

export function _getRecoverableManagedDatabasesOperations(
  context: SqlManagementContext,
): RecoverableManagedDatabasesOperations {
  return {
    ..._getRecoverableManagedDatabases(context),
  };
}
