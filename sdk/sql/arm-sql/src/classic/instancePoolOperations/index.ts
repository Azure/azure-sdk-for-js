// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { listByInstancePool, get } from "../../api/instancePoolOperations/operations.js";
import type {
  InstancePoolOperationsListByInstancePoolOptionalParams,
  InstancePoolOperationsGetOptionalParams,
} from "../../api/instancePoolOperations/options.js";
import type { InstancePoolOperation } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a InstancePoolOperations operations. */
export interface InstancePoolOperationsOperations {
  /** Gets a list of operations performed on the instance pool. */
  listByInstancePool: (
    resourceGroupName: string,
    instancePoolName: string,
    options?: InstancePoolOperationsListByInstancePoolOptionalParams,
  ) => PagedAsyncIterableIterator<InstancePoolOperation>;
  /** Gets a management operation on a instance pool. */
  get: (
    resourceGroupName: string,
    instancePoolName: string,
    operationId: string,
    options?: InstancePoolOperationsGetOptionalParams,
  ) => Promise<InstancePoolOperation>;
}

function _getInstancePoolOperations(context: SqlManagementContext) {
  return {
    listByInstancePool: (
      resourceGroupName: string,
      instancePoolName: string,
      options?: InstancePoolOperationsListByInstancePoolOptionalParams,
    ) => listByInstancePool(context, resourceGroupName, instancePoolName, options),
    get: (
      resourceGroupName: string,
      instancePoolName: string,
      operationId: string,
      options?: InstancePoolOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, instancePoolName, operationId, options),
  };
}

export function _getInstancePoolOperationsOperations(
  context: SqlManagementContext,
): InstancePoolOperationsOperations {
  return {
    ..._getInstancePoolOperations(context),
  };
}
