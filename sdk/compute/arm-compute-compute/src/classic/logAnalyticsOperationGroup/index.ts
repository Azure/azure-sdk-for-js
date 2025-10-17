// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  exportThrottledRequests,
  exportRequestRateByInterval,
} from "../../api/logAnalyticsOperationGroup/operations.js";
import type {
  LogAnalyticsOperationGroupExportThrottledRequestsOptionalParams,
  LogAnalyticsOperationGroupExportRequestRateByIntervalOptionalParams,
} from "../../api/logAnalyticsOperationGroup/options.js";
import type { RequestRateByIntervalInput, ThrottledRequestsInput } from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a LogAnalyticsOperationGroup operations. */
export interface LogAnalyticsOperationGroupOperations {
  /** Export logs that show total throttled Api requests for this subscription in the given time window. */
  exportThrottledRequests: (
    location: string,
    parameters: ThrottledRequestsInput,
    options?: LogAnalyticsOperationGroupExportThrottledRequestsOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Export logs that show Api requests made by this subscription in the given time window to show throttling activities. */
  exportRequestRateByInterval: (
    location: string,
    parameters: RequestRateByIntervalInput,
    options?: LogAnalyticsOperationGroupExportRequestRateByIntervalOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
}

function _getLogAnalyticsOperationGroup(context: ComputeContext) {
  return {
    exportThrottledRequests: (
      location: string,
      parameters: ThrottledRequestsInput,
      options?: LogAnalyticsOperationGroupExportThrottledRequestsOptionalParams,
    ) => exportThrottledRequests(context, location, parameters, options),
    exportRequestRateByInterval: (
      location: string,
      parameters: RequestRateByIntervalInput,
      options?: LogAnalyticsOperationGroupExportRequestRateByIntervalOptionalParams,
    ) => exportRequestRateByInterval(context, location, parameters, options),
  };
}

export function _getLogAnalyticsOperationGroupOperations(
  context: ComputeContext,
): LogAnalyticsOperationGroupOperations {
  return {
    ..._getLogAnalyticsOperationGroup(context),
  };
}
