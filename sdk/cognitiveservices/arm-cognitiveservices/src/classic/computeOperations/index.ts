// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { get } from "../../api/computeOperations/operations.js";
import type { ComputeOperationsGetOptionalParams } from "../../api/computeOperations/options.js";
import type { ComputeOperationStatus } from "../../models/models.js";

/** Interface representing a ComputeOperations operations. */
export interface ComputeOperationsOperations {
  /** Gets the status of a compute operation. */
  get: (
    location: string,
    operationId: string,
    options?: ComputeOperationsGetOptionalParams,
  ) => Promise<ComputeOperationStatus>;
}

function _getComputeOperations(context: CognitiveServicesManagementContext) {
  return {
    get: (location: string, operationId: string, options?: ComputeOperationsGetOptionalParams) =>
      get(context, location, operationId, options),
  };
}

export function _getComputeOperationsOperations(
  context: CognitiveServicesManagementContext,
): ComputeOperationsOperations {
  return {
    ..._getComputeOperations(context),
  };
}
