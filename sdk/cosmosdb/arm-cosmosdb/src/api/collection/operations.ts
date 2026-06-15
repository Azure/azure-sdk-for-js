// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext as Client } from "../index.js";
import type {
  _MetricListResult,
  Metric,
  _UsagesResult,
  Usage,
  _MetricDefinitionsListResult,
  MetricDefinition,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _metricListResultDeserializer,
  _usagesResultDeserializer,
  _metricDefinitionsListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CollectionListMetricDefinitionsOptionalParams,
  CollectionListUsagesOptionalParams,
  CollectionListMetricsOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listMetricDefinitionsSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseRid: string,
  collectionRid: string,
  options: CollectionListMetricDefinitionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/databases/{databaseRid}/collections/{collectionRid}/metricDefinitions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseRid: databaseRid,
      collectionRid: collectionRid,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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

export async function _listMetricDefinitionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_MetricDefinitionsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _metricDefinitionsListResultDeserializer(result.body);
}

/** Retrieves metric definitions for the given collection. */
export function listMetricDefinitions(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseRid: string,
  collectionRid: string,
  options: CollectionListMetricDefinitionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MetricDefinition> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listMetricDefinitionsSend(
        context,
        resourceGroupName,
        accountName,
        databaseRid,
        collectionRid,
        options,
      ),
    _listMetricDefinitionsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _listUsagesSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseRid: string,
  collectionRid: string,
  options: CollectionListUsagesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/databases/{databaseRid}/collections/{collectionRid}/usages{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseRid: databaseRid,
      collectionRid: collectionRid,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
      "%24filter": options?.filter,
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

export async function _listUsagesDeserialize(
  result: PathUncheckedResponse,
): Promise<_UsagesResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _usagesResultDeserializer(result.body);
}

/** Retrieves the usages (most recent storage data) for the given collection. */
export function listUsages(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseRid: string,
  collectionRid: string,
  options: CollectionListUsagesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Usage> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listUsagesSend(context, resourceGroupName, accountName, databaseRid, collectionRid, options),
    _listUsagesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _listMetricsSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseRid: string,
  collectionRid: string,
  filter: string,
  options: CollectionListMetricsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/databases/{databaseRid}/collections/{collectionRid}/metrics{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      databaseRid: databaseRid,
      collectionRid: collectionRid,
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
): Promise<_MetricListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _metricListResultDeserializer(result.body);
}

/** Retrieves the metrics determined by the given filter for the given database account and collection. */
export function listMetrics(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  databaseRid: string,
  collectionRid: string,
  filter: string,
  options: CollectionListMetricsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Metric> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listMetricsSend(
        context,
        resourceGroupName,
        accountName,
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
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}
