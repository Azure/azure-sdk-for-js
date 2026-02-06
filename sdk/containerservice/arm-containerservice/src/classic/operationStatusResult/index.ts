// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext } from "../../api/containerServiceContext.js";
import { get, list, getByAgentPool } from "../../api/operationStatusResult/operations.js";
import type {
  OperationStatusResultGetOptionalParams,
  OperationStatusResultListOptionalParams,
  OperationStatusResultGetByAgentPoolOptionalParams,
} from "../../api/operationStatusResult/options.js";
import type { OperationStatusResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a OperationStatusResult operations. */
export interface OperationStatusResultOperations {
  /** Get the status of a specific operation in the specified managed cluster. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    operationId: string,
    options?: OperationStatusResultGetOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Gets a list of operations in the specified managedCluster */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: OperationStatusResultListOptionalParams,
  ) => PagedAsyncIterableIterator<OperationStatusResult>;
  /** Get the status of a specific operation in the specified agent pool. */
  getByAgentPool: (
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    operationId: string,
    options?: OperationStatusResultGetByAgentPoolOptionalParams,
  ) => Promise<OperationStatusResult>;
}

function _getOperationStatusResult(context: ContainerServiceContext) {
  return {
    get: (
      resourceGroupName: string,
      resourceName: string,
      operationId: string,
      options?: OperationStatusResultGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, operationId, options),
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: OperationStatusResultListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    getByAgentPool: (
      resourceGroupName: string,
      resourceName: string,
      agentPoolName: string,
      operationId: string,
      options?: OperationStatusResultGetByAgentPoolOptionalParams,
    ) =>
      getByAgentPool(context, resourceGroupName, resourceName, agentPoolName, operationId, options),
  };
}

export function _getOperationStatusResultOperations(
  context: ContainerServiceContext,
): OperationStatusResultOperations {
  return {
    ..._getOperationStatusResult(context),
  };
}
