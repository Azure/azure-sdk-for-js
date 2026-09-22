// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import { get } from "../../api/scheduledActionOperationStatus/operations.js";
import type { ScheduledActionOperationStatusGetOptionalParams } from "../../api/scheduledActionOperationStatus/options.js";
import type { OperationStatusResult } from "../../models/models.js";

/** Interface representing a ScheduledActionOperationStatus operations. */
export interface ScheduledActionOperationStatusOperations {
  /** Gets the status of the specified scheduled action operation. */
  get: (
    location: string,
    operationId: string,
    options?: ScheduledActionOperationStatusGetOptionalParams,
  ) => Promise<OperationStatusResult>;
}

function _getScheduledActionOperationStatus(context: ComputeContext) {
  return {
    get: (
      location: string,
      operationId: string,
      options?: ScheduledActionOperationStatusGetOptionalParams,
    ) => get(context, location, operationId, options),
  };
}

export function _getScheduledActionOperationStatusOperations(
  context: ComputeContext,
): ScheduledActionOperationStatusOperations {
  return {
    ..._getScheduledActionOperationStatus(context),
  };
}
