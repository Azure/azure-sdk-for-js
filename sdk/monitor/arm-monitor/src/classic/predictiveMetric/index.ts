// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import { get } from "../../api/predictiveMetric/operations.js";
import type { PredictiveMetricGetOptionalParams } from "../../api/predictiveMetric/options.js";
import type { MicrosoftAutoScalePredictiveResponse } from "../../models/microsoft/autoScale/models.js";

/** Interface representing a PredictiveMetric operations. */
export interface PredictiveMetricOperations {
  /** get predictive autoscale metric future data */
  get: (
    resourceGroupName: string,
    autoscaleSettingName: string,
    timespan: string,
    interval: string,
    metricNamespace: string,
    metricName: string,
    aggregation: string,
    options?: PredictiveMetricGetOptionalParams,
  ) => Promise<MicrosoftAutoScalePredictiveResponse>;
}

function _getPredictiveMetric(context: MonitorContext) {
  return {
    get: (
      resourceGroupName: string,
      autoscaleSettingName: string,
      timespan: string,
      interval: string,
      metricNamespace: string,
      metricName: string,
      aggregation: string,
      options?: PredictiveMetricGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        autoscaleSettingName,
        timespan,
        interval,
        metricNamespace,
        metricName,
        aggregation,
        options,
      ),
  };
}

export function _getPredictiveMetricOperations(
  context: MonitorContext,
): PredictiveMetricOperations {
  return {
    ..._getPredictiveMetric(context),
  };
}
