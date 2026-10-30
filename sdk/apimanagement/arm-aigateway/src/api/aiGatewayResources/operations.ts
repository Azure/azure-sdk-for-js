// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  AiGatewayResource,
  AiGatewayUpdateParameters,
  _AiGatewayResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  aiGatewayResourceSerializer,
  aiGatewayResourceDeserializer,
  aiGatewayUpdateParametersSerializer,
  _aiGatewayResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AiGatewayResourcesListBySubscriptionOptionalParams,
  AiGatewayResourcesListByResourceGroupOptionalParams,
  AiGatewayResourcesDeleteOptionalParams,
  AiGatewayResourcesUpdateOptionalParams,
  AiGatewayResourcesCreateOrUpdateOptionalParams,
  AiGatewayResourcesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  options: AiGatewayResourcesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ApiManagement/aigateways{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_AiGatewayResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _aiGatewayResourceListResultDeserializer(result.body);
}

/** List AiGatewayResource resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: AiGatewayResourcesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AiGatewayResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-09-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: AiGatewayResourcesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_AiGatewayResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _aiGatewayResourceListResultDeserializer(result.body);
}

/** List AiGatewayResource resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: AiGatewayResourcesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AiGatewayResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-09-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  ifMatch: string,
  options: AiGatewayResourcesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { "if-match": ifMatch, ...options.requestOptions?.headers },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a AiGatewayResource */
export function $delete(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  ifMatch: string,
  options: AiGatewayResourcesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, aiGatewayName, ifMatch, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-09-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  ifMatch: string,
  properties: AiGatewayUpdateParameters,
  options: AiGatewayResourcesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "if-match": ifMatch,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: aiGatewayUpdateParametersSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<AiGatewayResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return aiGatewayResourceDeserializer(result.body);
}

/** Update a AiGatewayResource */
export function update(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  ifMatch: string,
  properties: AiGatewayUpdateParameters,
  options: AiGatewayResourcesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AiGatewayResource>, AiGatewayResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, aiGatewayName, ifMatch, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-09-01-preview",
  }) as PollerLike<OperationState<AiGatewayResource>, AiGatewayResource>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  resource: AiGatewayResource,
  options: AiGatewayResourcesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: aiGatewayResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AiGatewayResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return aiGatewayResourceDeserializer(result.body);
}

/** Create a AiGatewayResource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  resource: AiGatewayResource,
  options: AiGatewayResourcesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AiGatewayResource>, AiGatewayResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, aiGatewayName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-09-01-preview",
  }) as PollerLike<OperationState<AiGatewayResource>, AiGatewayResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  options: AiGatewayResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AiGatewayResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return aiGatewayResourceDeserializer(result.body);
}

/** Get a AiGatewayResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  options: AiGatewayResourcesGetOptionalParams = { requestOptions: {} },
): Promise<AiGatewayResource> {
  const result = await _getSend(context, resourceGroupName, aiGatewayName, options);
  return _getDeserialize(result);
}
