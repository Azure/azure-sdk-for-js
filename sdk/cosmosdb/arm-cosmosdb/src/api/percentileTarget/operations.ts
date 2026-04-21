// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext as Client } from "../index.js";
import type { _PercentileMetricListResult, PercentileMetric } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _percentileMetricListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { PercentileTargetListMetricsOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listMetricsSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  targetRegion: string,
  filter: string,
  options: PercentileTargetListMetricsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/targetRegion/{targetRegion}/percentile/metrics{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      targetRegion: targetRegion,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
      "%24filter": filter,
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

export async function _listMetricsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PercentileMetricListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _percentileMetricListResultDeserializer(result.body);
}

/** Retrieves the metrics determined by the given filter for the given account target region. This url is only for PBS and Replication Latency data */
export function listMetrics(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  targetRegion: string,
  filter: string,
  options: PercentileTargetListMetricsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PercentileMetric> {
  return buildPagedAsyncIterator(
    context,
    () => _listMetricsSend(context, resourceGroupName, accountName, targetRegion, filter, options),
    _listMetricsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}
