// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { commonCloudErrorDeserializer } from "../../models/common/models.js";
import type {
  IoTSecurityAPIIoTSecurityAggregatedRecommendation,
  _IoTSecurityAPIIoTSecurityAggregatedRecommendationList,
} from "../../models/ioTSecurityAPI/models.js";
import {
  ioTSecurityAPIIoTSecurityAggregatedRecommendationDeserializer,
  _ioTSecurityAPIIoTSecurityAggregatedRecommendationListDeserializer,
} from "../../models/ioTSecurityAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  IotSecuritySolutionsAnalyticsRecommendationListOptionalParams,
  IotSecuritySolutionsAnalyticsRecommendationGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  solutionName: string,
  options: IotSecuritySolutionsAnalyticsRecommendationListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/iotSecuritySolutions/{solutionName}/analyticsModels/default/aggregatedRecommendations{?api%2Dversion,%24top}",
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
): Promise<_IoTSecurityAPIIoTSecurityAggregatedRecommendationList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _ioTSecurityAPIIoTSecurityAggregatedRecommendationListDeserializer(result.body);
}

/** Use this method to get the list of aggregated security analytics recommendations of yours IoT Security solution. */
export function list(
  context: Client,
  resourceGroupName: string,
  solutionName: string,
  options: IotSecuritySolutionsAnalyticsRecommendationListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<IoTSecurityAPIIoTSecurityAggregatedRecommendation> {
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
  aggregatedRecommendationName: string,
  options: IotSecuritySolutionsAnalyticsRecommendationGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/iotSecuritySolutions/{solutionName}/analyticsModels/default/aggregatedRecommendations/{aggregatedRecommendationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionName: solutionName,
      aggregatedRecommendationName: aggregatedRecommendationName,
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
): Promise<IoTSecurityAPIIoTSecurityAggregatedRecommendation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return ioTSecurityAPIIoTSecurityAggregatedRecommendationDeserializer(result.body);
}

/** Use this method to get the aggregated security analytics recommendation of yours IoT Security solution. This aggregation is performed by recommendation name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  solutionName: string,
  aggregatedRecommendationName: string,
  options: IotSecuritySolutionsAnalyticsRecommendationGetOptionalParams = { requestOptions: {} },
): Promise<IoTSecurityAPIIoTSecurityAggregatedRecommendation> {
  const result = await _getSend(
    context,
    resourceGroupName,
    solutionName,
    aggregatedRecommendationName,
    options,
  );
  return _getDeserialize(result);
}
