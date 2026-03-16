// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext as Client } from "../index.js";
import type {
  GraphResourceGetResults,
  GraphResourceCreateUpdateParameters,
  _GraphResourcesListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  graphResourceGetResultsDeserializer,
  graphResourceCreateUpdateParametersSerializer,
  _graphResourcesListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  GraphResourcesListGraphsOptionalParams,
  GraphResourcesDeleteGraphResourceOptionalParams,
  GraphResourcesCreateUpdateGraphOptionalParams,
  GraphResourcesGetGraphOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listGraphsSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: GraphResourcesListGraphsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/graphs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
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

export async function _listGraphsDeserialize(
  result: PathUncheckedResponse,
): Promise<_GraphResourcesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _graphResourcesListResultDeserializer(result.body);
}

/** Lists the graphs under an existing Azure Cosmos DB database account. */
export function listGraphs(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: GraphResourcesListGraphsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GraphResourceGetResults> {
  return buildPagedAsyncIterator(
    context,
    () => _listGraphsSend(context, resourceGroupName, accountName, options),
    _listGraphsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _deleteGraphResourceSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  graphName: string,
  options: GraphResourcesDeleteGraphResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/graphs/{graphName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      graphName: graphName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteGraphResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes an existing Azure Cosmos DB Graph Resource. */
export function deleteGraphResource(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  graphName: string,
  options: GraphResourcesDeleteGraphResourceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteGraphResourceDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteGraphResourceSend(context, resourceGroupName, accountName, graphName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createUpdateGraphSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  graphName: string,
  createUpdateGraphParameters: GraphResourceCreateUpdateParameters,
  options: GraphResourcesCreateUpdateGraphOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/graphs/{graphName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      graphName: graphName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: graphResourceCreateUpdateParametersSerializer(createUpdateGraphParameters),
  });
}

export async function _createUpdateGraphDeserialize(
  result: PathUncheckedResponse,
): Promise<GraphResourceGetResults> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return graphResourceGetResultsDeserializer(result.body);
}

/** Create or update an Azure Cosmos DB Graph. */
export function createUpdateGraph(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  graphName: string,
  createUpdateGraphParameters: GraphResourceCreateUpdateParameters,
  options: GraphResourcesCreateUpdateGraphOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<GraphResourceGetResults>, GraphResourceGetResults> {
  return getLongRunningPoller(context, _createUpdateGraphDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createUpdateGraphSend(
        context,
        resourceGroupName,
        accountName,
        graphName,
        createUpdateGraphParameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<GraphResourceGetResults>, GraphResourceGetResults>;
}

export function _getGraphSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  graphName: string,
  options: GraphResourcesGetGraphOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/graphs/{graphName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      graphName: graphName,
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

export async function _getGraphDeserialize(
  result: PathUncheckedResponse,
): Promise<GraphResourceGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return graphResourceGetResultsDeserializer(result.body);
}

/** Gets the Graph resource under an existing Azure Cosmos DB database account with the provided name. */
export async function getGraph(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  graphName: string,
  options: GraphResourcesGetGraphOptionalParams = { requestOptions: {} },
): Promise<GraphResourceGetResults> {
  const result = await _getGraphSend(context, resourceGroupName, accountName, graphName, options);
  return _getGraphDeserialize(result);
}
