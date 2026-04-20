// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type { MicrosoftAutoScalePredictiveResponse } from "../../models/microsoft/autoScale/models.js";
import {
  microsoftAutoScaleAutoscaleErrorResponseDeserializer,
  microsoftAutoScalePredictiveResponseDeserializer,
} from "../../models/microsoft/autoScale/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { PredictiveMetricGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  autoscaleSettingName: string,
  timespan: string,
  interval: string,
  metricNamespace: string,
  metricName: string,
  aggregation: string,
  options: PredictiveMetricGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/autoscalesettings/{autoscaleSettingName}/predictiveMetrics{?api%2Dversion,timespan,interval,metricNamespace,metricName,aggregation}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      autoscaleSettingName: autoscaleSettingName,
      "api%2Dversion": "2022-10-01",
      timespan: timespan,
      interval: interval,
      metricNamespace: metricNamespace,
      metricName: metricName,
      aggregation: aggregation,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<MicrosoftAutoScalePredictiveResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftAutoScaleAutoscaleErrorResponseDeserializer(result.body);

    throw error;
  }

  return microsoftAutoScalePredictiveResponseDeserializer(result.body);
}

/** get predictive autoscale metric future data */
export async function get(
  context: Client,
  resourceGroupName: string,
  autoscaleSettingName: string,
  timespan: string,
  interval: string,
  metricNamespace: string,
  metricName: string,
  aggregation: string,
  options: PredictiveMetricGetOptionalParams = { requestOptions: {} },
): Promise<MicrosoftAutoScalePredictiveResponse> {
  const result = await _getSend(
    context,
    resourceGroupName,
    autoscaleSettingName,
    timespan,
    interval,
    metricNamespace,
    metricName,
    aggregation,
    options,
  );
  return _getDeserialize(result);
}
