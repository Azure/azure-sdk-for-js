// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import {
  exportThrottledRequests,
  exportRequestRateByInterval,
} from "../../api/logAnalytics/operations.js";
import type {
  LogAnalyticsExportThrottledRequestsOptionalParams,
  LogAnalyticsExportRequestRateByIntervalOptionalParams,
} from "../../api/logAnalytics/options.js";
import type {
  RequestRateByIntervalInput,
  LogAnalyticsOperationResult,
  ThrottledRequestsInput,
} from "../../models/compute/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a LogAnalytics operations. */
export interface LogAnalyticsOperations {
  /** Export logs that show total throttled Api requests for this subscription in the given time window. */
  exportThrottledRequests: (
    location: string,
    parameters: ThrottledRequestsInput,
    options?: LogAnalyticsExportThrottledRequestsOptionalParams,
  ) => PollerLike<OperationState<LogAnalyticsOperationResult>, LogAnalyticsOperationResult>;
  /** @deprecated use exportThrottledRequests instead */
  beginExportThrottledRequests: (
    location: string,
    parameters: ThrottledRequestsInput,
    options?: LogAnalyticsExportThrottledRequestsOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<LogAnalyticsOperationResult>, LogAnalyticsOperationResult>
  >;
  /** @deprecated use exportThrottledRequests instead */
  beginExportThrottledRequestsAndWait: (
    location: string,
    parameters: ThrottledRequestsInput,
    options?: LogAnalyticsExportThrottledRequestsOptionalParams,
  ) => Promise<LogAnalyticsOperationResult>;
  /** Export logs that show Api requests made by this subscription in the given time window to show throttling activities. */
  exportRequestRateByInterval: (
    location: string,
    parameters: RequestRateByIntervalInput,
    options?: LogAnalyticsExportRequestRateByIntervalOptionalParams,
  ) => PollerLike<OperationState<LogAnalyticsOperationResult>, LogAnalyticsOperationResult>;
  /** @deprecated use exportRequestRateByInterval instead */
  beginExportRequestRateByInterval: (
    location: string,
    parameters: RequestRateByIntervalInput,
    options?: LogAnalyticsExportRequestRateByIntervalOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<LogAnalyticsOperationResult>, LogAnalyticsOperationResult>
  >;
  /** @deprecated use exportRequestRateByInterval instead */
  beginExportRequestRateByIntervalAndWait: (
    location: string,
    parameters: RequestRateByIntervalInput,
    options?: LogAnalyticsExportRequestRateByIntervalOptionalParams,
  ) => Promise<LogAnalyticsOperationResult>;
}

function _getLogAnalytics(context: ComputeManagementContext) {
  return {
    exportThrottledRequests: (
      location: string,
      parameters: ThrottledRequestsInput,
      options?: LogAnalyticsExportThrottledRequestsOptionalParams,
    ) => exportThrottledRequests(context, location, parameters, options),
    beginExportThrottledRequests: async (
      location: string,
      parameters: ThrottledRequestsInput,
      options?: LogAnalyticsExportThrottledRequestsOptionalParams,
    ) => {
      const poller = exportThrottledRequests(context, location, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginExportThrottledRequestsAndWait: async (
      location: string,
      parameters: ThrottledRequestsInput,
      options?: LogAnalyticsExportThrottledRequestsOptionalParams,
    ) => {
      return await exportThrottledRequests(context, location, parameters, options);
    },
    exportRequestRateByInterval: (
      location: string,
      parameters: RequestRateByIntervalInput,
      options?: LogAnalyticsExportRequestRateByIntervalOptionalParams,
    ) => exportRequestRateByInterval(context, location, parameters, options),
    beginExportRequestRateByInterval: async (
      location: string,
      parameters: RequestRateByIntervalInput,
      options?: LogAnalyticsExportRequestRateByIntervalOptionalParams,
    ) => {
      const poller = exportRequestRateByInterval(context, location, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginExportRequestRateByIntervalAndWait: async (
      location: string,
      parameters: RequestRateByIntervalInput,
      options?: LogAnalyticsExportRequestRateByIntervalOptionalParams,
    ) => {
      return await exportRequestRateByInterval(context, location, parameters, options);
    },
  };
}

export function _getLogAnalyticsOperations(
  context: ComputeManagementContext,
): LogAnalyticsOperations {
  return {
    ..._getLogAnalytics(context),
  };
}
