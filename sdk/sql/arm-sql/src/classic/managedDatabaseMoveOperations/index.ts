// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { listByLocation, get } from "../../api/managedDatabaseMoveOperations/operations.js";
import type {
  ManagedDatabaseMoveOperationsListByLocationOptionalParams,
  ManagedDatabaseMoveOperationsGetOptionalParams,
} from "../../api/managedDatabaseMoveOperations/options.js";
import type { ManagedDatabaseMoveOperationResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ManagedDatabaseMoveOperations operations. */
export interface ManagedDatabaseMoveOperationsOperations {
  /** Lists managed database move operations. */
  listByLocation: (
    resourceGroupName: string,
    locationName: string,
    options?: ManagedDatabaseMoveOperationsListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedDatabaseMoveOperationResult>;
  /** Gets a managed database move operation. */
  get: (
    resourceGroupName: string,
    locationName: string,
    operationId: string,
    options?: ManagedDatabaseMoveOperationsGetOptionalParams,
  ) => Promise<ManagedDatabaseMoveOperationResult>;
}

function _getManagedDatabaseMoveOperations(context: SqlManagementContext) {
  return {
    listByLocation: (
      resourceGroupName: string,
      locationName: string,
      options?: ManagedDatabaseMoveOperationsListByLocationOptionalParams,
    ) => listByLocation(context, resourceGroupName, locationName, options),
    get: (
      resourceGroupName: string,
      locationName: string,
      operationId: string,
      options?: ManagedDatabaseMoveOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, locationName, operationId, options),
  };
}

export function _getManagedDatabaseMoveOperationsOperations(
  context: SqlManagementContext,
): ManagedDatabaseMoveOperationsOperations {
  return {
    ..._getManagedDatabaseMoveOperations(context),
  };
}
