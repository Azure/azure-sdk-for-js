// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceFabricManagedClustersManagementContext } from "../../api/serviceFabricManagedClustersManagementContext.js";
import { list } from "../../api/operations/operations.js";
import type { OperationsListOptionalParams } from "../../api/operations/options.js";
import type { OperationResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** Get the list of available Service Fabric resource provider API operations. */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<OperationResult>;
}

function _getOperations(context: ServiceFabricManagedClustersManagementContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(
  context: ServiceFabricManagedClustersManagementContext,
): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
