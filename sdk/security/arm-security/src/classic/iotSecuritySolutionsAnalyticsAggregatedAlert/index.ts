// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import {
  dismiss,
  list,
  get,
} from "../../api/iotSecuritySolutionsAnalyticsAggregatedAlert/operations.js";
import type {
  IotSecuritySolutionsAnalyticsAggregatedAlertDismissOptionalParams,
  IotSecuritySolutionsAnalyticsAggregatedAlertListOptionalParams,
  IotSecuritySolutionsAnalyticsAggregatedAlertGetOptionalParams,
} from "../../api/iotSecuritySolutionsAnalyticsAggregatedAlert/options.js";
import type { IoTSecurityAPIIoTSecurityAggregatedAlert } from "../../models/ioTSecurityAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a IotSecuritySolutionsAnalyticsAggregatedAlert operations. */
export interface IotSecuritySolutionsAnalyticsAggregatedAlertOperations {
  /** Use this method to dismiss an aggregated IoT Security Solution Alert. */
  dismiss: (
    resourceGroupName: string,
    solutionName: string,
    aggregatedAlertName: string,
    options?: IotSecuritySolutionsAnalyticsAggregatedAlertDismissOptionalParams,
  ) => Promise<void>;
  /** Use this method to get the aggregated alert list of yours IoT Security solution. */
  list: (
    resourceGroupName: string,
    solutionName: string,
    options?: IotSecuritySolutionsAnalyticsAggregatedAlertListOptionalParams,
  ) => PagedAsyncIterableIterator<IoTSecurityAPIIoTSecurityAggregatedAlert>;
  /** Use this method to get a single the aggregated alert of yours IoT Security solution. This aggregation is performed by alert name. */
  get: (
    resourceGroupName: string,
    solutionName: string,
    aggregatedAlertName: string,
    options?: IotSecuritySolutionsAnalyticsAggregatedAlertGetOptionalParams,
  ) => Promise<IoTSecurityAPIIoTSecurityAggregatedAlert>;
}

function _getIotSecuritySolutionsAnalyticsAggregatedAlert(context: SecurityCenterContext) {
  return {
    dismiss: (
      resourceGroupName: string,
      solutionName: string,
      aggregatedAlertName: string,
      options?: IotSecuritySolutionsAnalyticsAggregatedAlertDismissOptionalParams,
    ) => dismiss(context, resourceGroupName, solutionName, aggregatedAlertName, options),
    list: (
      resourceGroupName: string,
      solutionName: string,
      options?: IotSecuritySolutionsAnalyticsAggregatedAlertListOptionalParams,
    ) => list(context, resourceGroupName, solutionName, options),
    get: (
      resourceGroupName: string,
      solutionName: string,
      aggregatedAlertName: string,
      options?: IotSecuritySolutionsAnalyticsAggregatedAlertGetOptionalParams,
    ) => get(context, resourceGroupName, solutionName, aggregatedAlertName, options),
  };
}

export function _getIotSecuritySolutionsAnalyticsAggregatedAlertOperations(
  context: SecurityCenterContext,
): IotSecuritySolutionsAnalyticsAggregatedAlertOperations {
  return {
    ..._getIotSecuritySolutionsAnalyticsAggregatedAlert(context),
  };
}
