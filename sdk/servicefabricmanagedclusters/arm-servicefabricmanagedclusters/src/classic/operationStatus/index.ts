// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceFabricManagedClustersManagementContext } from "../../api/serviceFabricManagedClustersManagementContext.js";
import { get } from "../../api/operationStatus/operations.js";
import type { OperationStatusGetOptionalParams } from "../../api/operationStatus/options.js";
import type { LongRunningOperationResult } from "../../models/models.js";

/** Interface representing a OperationStatus operations. */
export interface OperationStatusOperations {
  /** Get long running operation status. */
  get: (
    location: string,
    operationId: string,
    options?: OperationStatusGetOptionalParams,
  ) => Promise<LongRunningOperationResult>;
}

function _getOperationStatus(context: ServiceFabricManagedClustersManagementContext) {
  return {
    get: (location: string, operationId: string, options?: OperationStatusGetOptionalParams) =>
      get(context, location, operationId, options),
  };
}

export function _getOperationStatusOperations(
  context: ServiceFabricManagedClustersManagementContext,
): OperationStatusOperations {
  return {
    ..._getOperationStatus(context),
  };
}
