// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagedClustersManagementContext } from "../../api/serviceFabricManagedClustersManagementContext.js";
import { OperationResultsGetOptionalParams } from "../../api/operationResults/options.js";
import { get } from "../../api/operationResults/operations.js";

/** Interface representing a OperationResults operations. */
export interface OperationResultsOperations {
  /** Get long running operation result. */
  get: (
    location: string,
    operationId: string,
    options?: OperationResultsGetOptionalParams,
  ) => Promise<void>;
}

function _getOperationResults(context: ServiceFabricManagedClustersManagementContext) {
  return {
    get: (location: string, operationId: string, options?: OperationResultsGetOptionalParams) =>
      get(context, location, operationId, options),
  };
}

export function _getOperationResultsOperations(
  context: ServiceFabricManagedClustersManagementContext,
): OperationResultsOperations {
  return {
    ..._getOperationResults(context),
  };
}
