// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
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

function _getManagedDatabaseMoveOperations(context: SqlContext) {
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
  context: SqlContext,
): ManagedDatabaseMoveOperationsOperations {
  return {
    ..._getManagedDatabaseMoveOperations(context),
  };
}
