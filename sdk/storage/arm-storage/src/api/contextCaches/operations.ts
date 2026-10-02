// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageManagementContext as Client } from "../index.js";
import type {
  ContextCache,
  ContextCacheUpdate,
  _ContextCacheListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer_1,
  contextCacheSerializer,
  contextCacheDeserializer,
  contextCacheUpdateSerializer,
  _contextCacheListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ContextCachesListBySubscriptionOptionalParams,
  ContextCachesListByResourceGroupOptionalParams,
  ContextCachesDeleteOptionalParams,
  ContextCachesUpdateOptionalParams,
  ContextCachesCreateOrUpdateOptionalParams,
  ContextCachesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  options: ContextCachesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Storage/contextCaches{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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
): Promise<_ContextCacheListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return _contextCacheListResultDeserializer(result.body);
}

/** List Context Caches by subscription. */
export function listBySubscription(
  context: Client,
  options: ContextCachesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ContextCache> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ContextCachesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/contextCaches{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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
): Promise<_ContextCacheListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return _contextCacheListResultDeserializer(result.body);
}

/** List Context Caches by resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ContextCachesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ContextCache> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  contextCacheName: string,
  options: ContextCachesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/contextCaches/{contextCacheName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      contextCacheName: contextCacheName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a Context Cache. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  contextCacheName: string,
  options: ContextCachesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, contextCacheName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  contextCacheName: string,
  properties: ContextCacheUpdate,
  options: ContextCachesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/contextCaches/{contextCacheName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      contextCacheName: contextCacheName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: contextCacheUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ContextCache> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return contextCacheDeserializer(result.body);
}

/** Update a Context Cache. */
export function update(
  context: Client,
  resourceGroupName: string,
  contextCacheName: string,
  properties: ContextCacheUpdate,
  options: ContextCachesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ContextCache>, ContextCache> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, contextCacheName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-01",
  }) as PollerLike<OperationState<ContextCache>, ContextCache>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  contextCacheName: string,
  resource: ContextCache,
  options: ContextCachesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/contextCaches/{contextCacheName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      contextCacheName: contextCacheName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: contextCacheSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ContextCache> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return contextCacheDeserializer(result.body);
}

/** Create or update a Context Cache. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  contextCacheName: string,
  resource: ContextCache,
  options: ContextCachesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ContextCache>, ContextCache> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, contextCacheName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-06-01",
  }) as PollerLike<OperationState<ContextCache>, ContextCache>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  contextCacheName: string,
  options: ContextCachesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/contextCaches/{contextCacheName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      contextCacheName: contextCacheName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ContextCache> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return contextCacheDeserializer(result.body);
}

/** Get a Context Cache. */
export async function get(
  context: Client,
  resourceGroupName: string,
  contextCacheName: string,
  options: ContextCachesGetOptionalParams = { requestOptions: {} },
): Promise<ContextCache> {
  const result = await _getSend(context, resourceGroupName, contextCacheName, options);
  return _getDeserialize(result);
}
