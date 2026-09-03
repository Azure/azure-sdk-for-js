// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EdgeActionsManagementContext as Client } from "../index.js";
import type {
  EdgeActionExecutionFilter,
  EdgeActionExecutionFilterUpdate,
  _EdgeActionExecutionFilterListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  edgeActionExecutionFilterSerializer,
  edgeActionExecutionFilterDeserializer,
  edgeActionExecutionFilterUpdateSerializer,
  _edgeActionExecutionFilterListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  EdgeActionExecutionFiltersListByEdgeActionOptionalParams,
  EdgeActionExecutionFiltersDeleteOptionalParams,
  EdgeActionExecutionFiltersUpdateOptionalParams,
  EdgeActionExecutionFiltersCreateOptionalParams,
  EdgeActionExecutionFiltersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByEdgeActionSend(
  context: Client,
  resourceGroupName: string,
  edgeActionName: string,
  options: EdgeActionExecutionFiltersListByEdgeActionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/edgeActions/{edgeActionName}/executionFilters{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      edgeActionName: edgeActionName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
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

export async function _listByEdgeActionDeserialize(
  result: PathUncheckedResponse,
): Promise<_EdgeActionExecutionFilterListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _edgeActionExecutionFilterListResultDeserializer(result.body);
}

/** List EdgeActionExecutionFilter resources by EdgeAction */
export function listByEdgeAction(
  context: Client,
  resourceGroupName: string,
  edgeActionName: string,
  options: EdgeActionExecutionFiltersListByEdgeActionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EdgeActionExecutionFilter> {
  return buildPagedAsyncIterator(
    context,
    () => _listByEdgeActionSend(context, resourceGroupName, edgeActionName, options),
    _listByEdgeActionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-12-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  edgeActionName: string,
  executionFilter: string,
  options: EdgeActionExecutionFiltersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/edgeActions/{edgeActionName}/executionFilters/{executionFilter}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      edgeActionName: edgeActionName,
      executionFilter: executionFilter,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a EdgeActionExecutionFilter */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  edgeActionName: string,
  executionFilter: string,
  options: EdgeActionExecutionFiltersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, edgeActionName, executionFilter, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  edgeActionName: string,
  executionFilter: string,
  properties: EdgeActionExecutionFilterUpdate,
  options: EdgeActionExecutionFiltersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/edgeActions/{edgeActionName}/executionFilters/{executionFilter}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      edgeActionName: edgeActionName,
      executionFilter: executionFilter,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: edgeActionExecutionFilterUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<EdgeActionExecutionFilter> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return edgeActionExecutionFilterDeserializer(result.body);
}

/** Update a EdgeActionExecutionFilter */
export function update(
  context: Client,
  resourceGroupName: string,
  edgeActionName: string,
  executionFilter: string,
  properties: EdgeActionExecutionFilterUpdate,
  options: EdgeActionExecutionFiltersUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EdgeActionExecutionFilter>, EdgeActionExecutionFilter> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, edgeActionName, executionFilter, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01-preview",
  }) as PollerLike<OperationState<EdgeActionExecutionFilter>, EdgeActionExecutionFilter>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  edgeActionName: string,
  executionFilter: string,
  resource: EdgeActionExecutionFilter,
  options: EdgeActionExecutionFiltersCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/edgeActions/{edgeActionName}/executionFilters/{executionFilter}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      edgeActionName: edgeActionName,
      executionFilter: executionFilter,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: edgeActionExecutionFilterSerializer(resource),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<EdgeActionExecutionFilter> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return edgeActionExecutionFilterDeserializer(result.body);
}

/** Create a EdgeActionExecutionFilter */
export function create(
  context: Client,
  resourceGroupName: string,
  edgeActionName: string,
  executionFilter: string,
  resource: EdgeActionExecutionFilter,
  options: EdgeActionExecutionFiltersCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EdgeActionExecutionFilter>, EdgeActionExecutionFilter> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, edgeActionName, executionFilter, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01-preview",
  }) as PollerLike<OperationState<EdgeActionExecutionFilter>, EdgeActionExecutionFilter>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  edgeActionName: string,
  executionFilter: string,
  options: EdgeActionExecutionFiltersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/edgeActions/{edgeActionName}/executionFilters/{executionFilter}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      edgeActionName: edgeActionName,
      executionFilter: executionFilter,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
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
): Promise<EdgeActionExecutionFilter> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return edgeActionExecutionFilterDeserializer(result.body);
}

/** Get a EdgeActionExecutionFilter */
export async function get(
  context: Client,
  resourceGroupName: string,
  edgeActionName: string,
  executionFilter: string,
  options: EdgeActionExecutionFiltersGetOptionalParams = { requestOptions: {} },
): Promise<EdgeActionExecutionFilter> {
  const result = await _getSend(
    context,
    resourceGroupName,
    edgeActionName,
    executionFilter,
    options,
  );
  return _getDeserialize(result);
}
