// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _PartitionMetricListResult,
  _partitionMetricListResultDeserializer,
  PartitionMetric,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { CollectionPartitionRegionListMetricsOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listMetricsSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  region: string,
  databaseRid: string,
  collectionRid: string,
  filter: string,
  options: CollectionPartitionRegionListMetricsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/region/{region}/databases/{databaseRid}/collections/{collectionRid}/partitions/metrics{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      region: region,
      databaseRid: databaseRid,
      collectionRid: collectionRid,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
      "%24filter": filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _partitionMetricListResultDeserializer(result.body);
}

/** Retrieves the metrics determined by the given filter for the given collection and region, split by partition. */
export function listMetrics(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  region: string,
  databaseRid: string,
  collectionRid: string,
  filter: string,
  options: CollectionPartitionRegionListMetricsOptionalParams = { requestOptions: {} },
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
        filter,
        options,
      ),
    _listMetricsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-04-01-preview",
    },
  );
}
