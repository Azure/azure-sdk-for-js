// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { listByInstance, get } from "../../api/restorableDroppedManagedDatabases/operations.js";
import type {
  RestorableDroppedManagedDatabasesListByInstanceOptionalParams,
  RestorableDroppedManagedDatabasesGetOptionalParams,
} from "../../api/restorableDroppedManagedDatabases/options.js";
import type { RestorableDroppedManagedDatabase } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RestorableDroppedManagedDatabases operations. */
export interface RestorableDroppedManagedDatabasesOperations {
  /** Gets a list of restorable dropped managed databases. */
  listByInstance: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: RestorableDroppedManagedDatabasesListByInstanceOptionalParams,
  ) => PagedAsyncIterableIterator<RestorableDroppedManagedDatabase>;
  /** Gets a restorable dropped managed database. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    restorableDroppedDatabaseId: string,
    options?: RestorableDroppedManagedDatabasesGetOptionalParams,
  ) => Promise<RestorableDroppedManagedDatabase>;
}

function _getRestorableDroppedManagedDatabases(context: SqlManagementContext) {
  return {
    listByInstance: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: RestorableDroppedManagedDatabasesListByInstanceOptionalParams,
    ) => listByInstance(context, resourceGroupName, managedInstanceName, options),
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      restorableDroppedDatabaseId: string,
      options?: RestorableDroppedManagedDatabasesGetOptionalParams,
    ) => get(context, resourceGroupName, managedInstanceName, restorableDroppedDatabaseId, options),
  };
}

export function _getRestorableDroppedManagedDatabasesOperations(
  context: SqlManagementContext,
): RestorableDroppedManagedDatabasesOperations {
  return {
    ..._getRestorableDroppedManagedDatabases(context),
  };
}
