// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type { MetricAlertStatusCollection } from "../../models/microsoft/metricAlert/models.js";
import {
  metricAlertErrorResponseDeserializer,
  metricAlertStatusCollectionDeserializer,
} from "../../models/microsoft/metricAlert/models.js";
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
      "api%2Dversion": "2024-03-01-preview",
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
): Promise<MetricAlertStatusCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = metricAlertErrorResponseDeserializer(result.body);

    throw error;
  }

  return metricAlertStatusCollectionDeserializer(result.body);
}

/** Retrieve an alert rule status. */
export async function listByName(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  statusName: string,
  options: MetricAlertsStatusListByNameOptionalParams = { requestOptions: {} },
): Promise<MetricAlertStatusCollection> {
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
      "api%2Dversion": "2024-03-01-preview",
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
): Promise<MetricAlertStatusCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = metricAlertErrorResponseDeserializer(result.body);

    throw error;
  }

  return metricAlertStatusCollectionDeserializer(result.body);
}

/** Retrieve an alert rule status. */
export async function list(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  options: MetricAlertsStatusListOptionalParams = { requestOptions: {} },
): Promise<MetricAlertStatusCollection> {
  const result = await _listSend(context, resourceGroupName, ruleName, options);
  return _listDeserialize(result);
}
