// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type { MetricAlertApiMetricAlertStatusCollection } from "../../models/metricAlertApi/models.js";
import {
  metricAlertApiMetricAlertErrorResponseDeserializer,
  metricAlertApiMetricAlertStatusCollectionDeserializer,
} from "../../models/metricAlertApi/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MetricAlertsStatusListByNameOptionalParams,
  MetricAlertsStatusListOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByNameSend(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  statusName: string,
  options: MetricAlertsStatusListByNameOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/metricAlerts/{ruleName}/status/{statusName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ruleName: ruleName,
      statusName: statusName,
      "api%2Dversion": "2026-01-01",
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

export async function _listByNameDeserialize(
  result: PathUncheckedResponse,
): Promise<MetricAlertApiMetricAlertStatusCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = metricAlertApiMetricAlertErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return metricAlertApiMetricAlertStatusCollectionDeserializer(result.body);
}

/** Retrieve an alert rule status. */
export async function listByName(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  statusName: string,
  options: MetricAlertsStatusListByNameOptionalParams = { requestOptions: {} },
): Promise<MetricAlertApiMetricAlertStatusCollection> {
  const result = await _listByNameSend(context, resourceGroupName, ruleName, statusName, options);
  return _listByNameDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  options: MetricAlertsStatusListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/metricAlerts/{ruleName}/status{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ruleName: ruleName,
      "api%2Dversion": "2026-01-01",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<MetricAlertApiMetricAlertStatusCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = metricAlertApiMetricAlertErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return metricAlertApiMetricAlertStatusCollectionDeserializer(result.body);
}

/** Retrieve an alert rule status. */
export async function list(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  options: MetricAlertsStatusListOptionalParams = { requestOptions: {} },
): Promise<MetricAlertApiMetricAlertStatusCollection> {
  const result = await _listSend(context, resourceGroupName, ruleName, options);
  return _listDeserialize(result);
}
