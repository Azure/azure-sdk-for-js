// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ManagedInstanceQuery,
  managedInstanceQueryDeserializer,
  _ManagedInstanceQueryStatistics,
  _managedInstanceQueryStatisticsDeserializer,
  QueryStatistics,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ManagedDatabaseQueriesListByQueryOptionalParams,
  ManagedDatabaseQueriesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByQuerySend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  queryId: string,
  options: ManagedDatabaseQueriesListByQueryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/queries/{queryId}/statistics{?api%2Dversion,startTime,endTime,interval}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
      queryId: queryId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
      startTime: options?.startTime,
      endTime: options?.endTime,
      interval: options?.interval,
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

export async function _listByQueryDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedInstanceQueryStatistics> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _managedInstanceQueryStatisticsDeserializer(result.body);
}

/** Get query execution statistics by query id. */
export function listByQuery(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  queryId: string,
  options: ManagedDatabaseQueriesListByQueryOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<QueryStatistics> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByQuerySend(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        queryId,
        options,
      ),
    _listByQueryDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-01-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  queryId: string,
  options: ManagedDatabaseQueriesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/queries/{queryId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
      queryId: queryId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
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
): Promise<ManagedInstanceQuery> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedInstanceQueryDeserializer(result.body);
}

/** Get query by query id. */
export async function get(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  queryId: string,
  options: ManagedDatabaseQueriesGetOptionalParams = { requestOptions: {} },
): Promise<ManagedInstanceQuery> {
  const result = await _getSend(
    context,
    resourceGroupName,
    managedInstanceName,
    databaseName,
    queryId,
    options,
  );
  return _getDeserialize(result);
}
