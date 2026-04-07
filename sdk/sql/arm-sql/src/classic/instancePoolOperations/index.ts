// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
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

function _getInstancePoolOperations(context: SqlContext) {
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
  context: SqlContext,
): InstancePoolOperationsOperations {
  return {
    ..._getInstancePoolOperations(context),
  };
}
