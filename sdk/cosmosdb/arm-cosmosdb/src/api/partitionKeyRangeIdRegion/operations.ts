// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext as Client } from "../index.js";
import type { _PartitionMetricListResult, PartitionMetric } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _partitionMetricListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { PartitionKeyRangeIdRegionListMetricsOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listMetricsSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  region: string,
  databaseRid: string,
  collectionRid: string,
  partitionKeyRangeId: string,
  filter: string,
  options: PartitionKeyRangeIdRegionListMetricsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/region/{region}/databases/{databaseRid}/collections/{collectionRid}/partitionKeyRangeId/{partitionKeyRangeId}/metrics{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      region: region,
      databaseRid: databaseRid,
      collectionRid: collectionRid,
      partitionKeyRangeId: partitionKeyRangeId,
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
): Promise<_PartitionMetricListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _partitionMetricListResultDeserializer(result.body);
}

/** Retrieves the metrics determined by the given filter for the given partition key range id and region. */
export function listMetrics(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  region: string,
  databaseRid: string,
  collectionRid: string,
  partitionKeyRangeId: string,
  filter: string,
  options: PartitionKeyRangeIdRegionListMetricsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PartitionMetric> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listMetricsSend(
        context,
        resourceGroupName,
        accountName,
        region,
        databaseRid,
        collectionRid,
        partitionKeyRangeId,
        filter,
        options,
      ),
    _listMetricsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}
