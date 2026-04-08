// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext as Client } from "../index.js";
import type {
  ManagedInstanceQuery,
  _ManagedInstanceQueryStatistics,
  QueryStatistics,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  managedInstanceQueryDeserializer,
  _managedInstanceQueryStatisticsDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagedDatabaseQueriesListByQueryOptionalParams,
  ManagedDatabaseQueriesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

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
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
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
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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
