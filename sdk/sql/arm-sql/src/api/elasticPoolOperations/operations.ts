// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _ElasticPoolOperationListResult,
  _elasticPoolOperationListResultDeserializer,
  ElasticPoolOperation,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ElasticPoolOperationsCancelOptionalParams,
  ElasticPoolOperationsListByElasticPoolOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _cancelSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  elasticPoolName: string,
  operationId: string,
  options: ElasticPoolOperationsCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/elasticPools/{elasticPoolName}/operations/{operationId}/cancel{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      elasticPoolName: elasticPoolName,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _cancelDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Cancels the asynchronous operation on the elastic pool. */
export async function cancel(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  elasticPoolName: string,
  operationId: string,
  options: ElasticPoolOperationsCancelOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _cancelSend(
    context,
    resourceGroupName,
    serverName,
    elasticPoolName,
    operationId,
    options,
  );
  return _cancelDeserialize(result);
}

export function _listByElasticPoolSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  elasticPoolName: string,
  options: ElasticPoolOperationsListByElasticPoolOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/elasticPools/{elasticPoolName}/operations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      elasticPoolName: elasticPoolName,
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

export async function _listByElasticPoolDeserialize(
  result: PathUncheckedResponse,
): Promise<_ElasticPoolOperationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _elasticPoolOperationListResultDeserializer(result.body);
}

/** Gets a list of operations performed on the elastic pool. */
export function listByElasticPool(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  elasticPoolName: string,
  options: ElasticPoolOperationsListByElasticPoolOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ElasticPoolOperation> {
  return buildPagedAsyncIterator(
    context,
    () => _listByElasticPoolSend(context, resourceGroupName, serverName, elasticPoolName, options),
    _listByElasticPoolDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}
