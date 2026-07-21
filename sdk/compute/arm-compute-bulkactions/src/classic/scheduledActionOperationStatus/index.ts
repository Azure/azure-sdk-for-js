// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import { get } from "../../api/scheduledActionOperationStatus/operations.js";
import type { ScheduledActionOperationStatusGetOptionalParams } from "../../api/scheduledActionOperationStatus/options.js";
import type { OperationStatusResult } from "../../models/models.js";

/** Interface representing a ScheduledActionOperationStatus operations. */
export interface ScheduledActionOperationStatusOperations {
  /** Get the status of a ScheduledActions asynchronous operation. Both the `Azure-AsyncOperation` and `Location` headers returned by long-running operations point at this endpoint. */
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
