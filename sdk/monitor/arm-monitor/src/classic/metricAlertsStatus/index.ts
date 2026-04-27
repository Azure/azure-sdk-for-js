// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import { listByName, list } from "../../api/metricAlertsStatus/operations.js";
import type {
  MetricAlertsStatusListByNameOptionalParams,
  MetricAlertsStatusListOptionalParams,
} from "../../api/metricAlertsStatus/options.js";
import type { MetricAlertStatusCollection } from "../../models/microsoft/metricAlert/models.js";

/** Interface representing a MetricAlertsStatus operations. */
export interface MetricAlertsStatusOperations {
  /** Retrieve an alert rule status. */
  listByName: (
    resourceGroupName: string,
    ruleName: string,
    statusName: string,
    options?: MetricAlertsStatusListByNameOptionalParams,
  ) => Promise<MetricAlertStatusCollection>;
  /** Retrieve an alert rule status. */
  list: (
    resourceGroupName: string,
    ruleName: string,
    options?: MetricAlertsStatusListOptionalParams,
  ) => Promise<MetricAlertStatusCollection>;
}

function _getMetricAlertsStatus(context: MonitorContext) {
  return {
    listByName: (
      resourceGroupName: string,
      ruleName: string,
      statusName: string,
      options?: MetricAlertsStatusListByNameOptionalParams,
    ) => listByName(context, resourceGroupName, ruleName, statusName, options),
    list: (
      resourceGroupName: string,
      ruleName: string,
      options?: MetricAlertsStatusListOptionalParams,
    ) => list(context, resourceGroupName, ruleName, options),
  };
}

export function _getMetricAlertsStatusOperations(
  context: MonitorContext,
): MetricAlertsStatusOperations {
  return {
    ..._getMetricAlertsStatus(context),
  };
}
