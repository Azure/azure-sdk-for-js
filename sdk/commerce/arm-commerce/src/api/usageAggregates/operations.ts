// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { UsageManagementContext as Client } from "../index.js";
import type { _UsageAggregationListResult, UsageAggregation } from "../../models/models.js";
import {
  _usageAggregationListResultDeserializer,
  errorObjectResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { UsageAggregatesListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  reportedStartTime: Date,
  reportedEndTime: Date,
  options: UsageAggregatesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Commerce/usageAggregates{?api%2Dversion,reportedStartTime,reportedEndTime,showDetails,aggregationGranularity,continuationToken}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2015-06-01-preview",
      reportedStartTime: reportedStartTime.toISOString(),
      reportedEndTime: reportedEndTime.toISOString(),
      showDetails: options?.showDetails,
      aggregationGranularity: options?.aggregationGranularity ?? "Daily",
      continuationToken: options?.continuationToken,
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
): Promise<_UsageAggregationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    const statusCode = Number.parseInt(result.status);
    if (statusCode === 202) {
      error.details = errorObjectResponseDeserializer(result.body);
    } else {
      error.details = errorObjectResponseDeserializer(result.body);
    }
    throw error;
  }

  return _usageAggregationListResultDeserializer(result.body);
}

/** Query aggregated Azure subscription consumption data for a date range. */
export function list(
  context: Client,
  reportedStartTime: Date,
  reportedEndTime: Date,
  options: UsageAggregatesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<UsageAggregation> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, reportedStartTime, reportedEndTime, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2015-06-01-preview",
    },
  );
}
