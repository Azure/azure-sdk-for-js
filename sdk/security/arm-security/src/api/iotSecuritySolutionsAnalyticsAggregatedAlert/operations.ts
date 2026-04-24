// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type {
  IoTSecurityAggregatedAlert,
  _IoTSecurityAggregatedAlertList,
} from "../../models/ioTSecurityAPI/models.js";
import {
  ioTSecurityAggregatedAlertDeserializer,
  _ioTSecurityAggregatedAlertListDeserializer,
} from "../../models/ioTSecurityAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  IotSecuritySolutionsAnalyticsAggregatedAlertDismissOptionalParams,
  IotSecuritySolutionsAnalyticsAggregatedAlertListOptionalParams,
  IotSecuritySolutionsAnalyticsAggregatedAlertGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _dismissSend(
  context: Client,
  resourceGroupName: string,
  solutionName: string,
  aggregatedAlertName: string,
  options: IotSecuritySolutionsAnalyticsAggregatedAlertDismissOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/iotSecuritySolutions/{solutionName}/analyticsModels/default/aggregatedAlerts/{aggregatedAlertName}/dismiss{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionName: solutionName,
      aggregatedAlertName: aggregatedAlertName,
      "api%2Dversion": "2019-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _dismissDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Use this method to dismiss an aggregated IoT Security Solution Alert. */
export async function dismiss(
  context: Client,
  resourceGroupName: string,
  solutionName: string,
  aggregatedAlertName: string,
  options: IotSecuritySolutionsAnalyticsAggregatedAlertDismissOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _dismissSend(
    context,
    resourceGroupName,
    solutionName,
    aggregatedAlertName,
    options,
  );
  return _dismissDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  solutionName: string,
  options: IotSecuritySolutionsAnalyticsAggregatedAlertListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/iotSecuritySolutions/{solutionName}/analyticsModels/default/aggregatedAlerts{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionName: solutionName,
      "api%2Dversion": "2019-08-01",
      "%24top": options?.top,
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
): Promise<_IoTSecurityAggregatedAlertList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _ioTSecurityAggregatedAlertListDeserializer(result.body);
}

/** Use this method to get the aggregated alert list of yours IoT Security solution. */
export function list(
  context: Client,
  resourceGroupName: string,
  solutionName: string,
  options: IotSecuritySolutionsAnalyticsAggregatedAlertListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<IoTSecurityAggregatedAlert> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, solutionName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2019-08-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  solutionName: string,
  aggregatedAlertName: string,
  options: IotSecuritySolutionsAnalyticsAggregatedAlertGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/iotSecuritySolutions/{solutionName}/analyticsModels/default/aggregatedAlerts/{aggregatedAlertName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionName: solutionName,
      aggregatedAlertName: aggregatedAlertName,
      "api%2Dversion": "2019-08-01",
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
): Promise<IoTSecurityAggregatedAlert> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return ioTSecurityAggregatedAlertDeserializer(result.body);
}

/** Use this method to get a single the aggregated alert of yours IoT Security solution. This aggregation is performed by alert name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  solutionName: string,
  aggregatedAlertName: string,
  options: IotSecuritySolutionsAnalyticsAggregatedAlertGetOptionalParams = { requestOptions: {} },
): Promise<IoTSecurityAggregatedAlert> {
  const result = await _getSend(
    context,
    resourceGroupName,
    solutionName,
    aggregatedAlertName,
    options,
  );
  return _getDeserialize(result);
}
