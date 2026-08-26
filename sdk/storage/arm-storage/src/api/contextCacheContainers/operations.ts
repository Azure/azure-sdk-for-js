// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageManagementContext as Client } from "../index.js";
import type {
  ContextCacheContainer,
  ContextCacheContainerUpdate,
  _ContextCacheContainerListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer_1,
  contextCacheContainerSerializer,
  contextCacheContainerDeserializer,
  contextCacheContainerUpdateSerializer,
  _contextCacheContainerListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ContextCacheContainersListByContextCacheOptionalParams,
  ContextCacheContainersDeleteOptionalParams,
  ContextCacheContainersUpdateOptionalParams,
  ContextCacheContainersCreateOrUpdateOptionalParams,
  ContextCacheContainersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByContextCacheSend(
  context: Client,
  resourceGroupName: string,
  contextCacheName: string,
  options: ContextCacheContainersListByContextCacheOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/contextCaches/{contextCacheName}/contextCacheContainers{?api%2Dversion}",
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

export async function _listByContextCacheDeserialize(
  result: PathUncheckedResponse,
): Promise<_ContextCacheContainerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return _contextCacheContainerListResultDeserializer(result.body);
}

/** List all containers in a Context Cache. */
export function listByContextCache(
  context: Client,
  resourceGroupName: string,
  contextCacheName: string,
  options: ContextCacheContainersListByContextCacheOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ContextCacheContainer> {
  return buildPagedAsyncIterator(
    context,
    () => _listByContextCacheSend(context, resourceGroupName, contextCacheName, options),
    _listByContextCacheDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  contextCacheName: string,
  contextCacheContainerName: string,
  options: ContextCacheContainersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/contextCaches/{contextCacheName}/contextCacheContainers/{contextCacheContainerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      contextCacheName: contextCacheName,
      contextCacheContainerName: contextCacheContainerName,
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

/** Delete a container from a Context Cache. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  contextCacheName: string,
  contextCacheContainerName: string,
  options: ContextCacheContainersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        contextCacheName,
        contextCacheContainerName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  contextCacheName: string,
  contextCacheContainerName: string,
  properties: ContextCacheContainerUpdate,
  options: ContextCacheContainersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/contextCaches/{contextCacheName}/contextCacheContainers/{contextCacheContainerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      contextCacheName: contextCacheName,
      contextCacheContainerName: contextCacheContainerName,
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
    body: contextCacheContainerUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ContextCacheContainer> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return contextCacheContainerDeserializer(result.body);
}

/** Update a container in a Context Cache. */
export function update(
  context: Client,
  resourceGroupName: string,
  contextCacheName: string,
  contextCacheContainerName: string,
  properties: ContextCacheContainerUpdate,
  options: ContextCacheContainersUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ContextCacheContainer>, ContextCacheContainer> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        contextCacheName,
        contextCacheContainerName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-01",
  }) as PollerLike<OperationState<ContextCacheContainer>, ContextCacheContainer>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  contextCacheName: string,
  contextCacheContainerName: string,
  resource: ContextCacheContainer,
  options: ContextCacheContainersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/contextCaches/{contextCacheName}/contextCacheContainers/{contextCacheContainerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      contextCacheName: contextCacheName,
      contextCacheContainerName: contextCacheContainerName,
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
    body: contextCacheContainerSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ContextCacheContainer> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return contextCacheContainerDeserializer(result.body);
}

/** Create or update a container in a Context Cache. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  contextCacheName: string,
  contextCacheContainerName: string,
  resource: ContextCacheContainer,
  options: ContextCacheContainersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ContextCacheContainer>, ContextCacheContainer> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        contextCacheName,
        contextCacheContainerName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-06-01",
  }) as PollerLike<OperationState<ContextCacheContainer>, ContextCacheContainer>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  contextCacheName: string,
  contextCacheContainerName: string,
  options: ContextCacheContainersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/contextCaches/{contextCacheName}/contextCacheContainers/{contextCacheContainerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      contextCacheName: contextCacheName,
      contextCacheContainerName: contextCacheContainerName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ContextCacheContainer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return contextCacheContainerDeserializer(result.body);
}

/** Get a container in a Context Cache. */
export async function get(
  context: Client,
  resourceGroupName: string,
  contextCacheName: string,
  contextCacheContainerName: string,
  options: ContextCacheContainersGetOptionalParams = { requestOptions: {} },
): Promise<ContextCacheContainer> {
  const result = await _getSend(
    context,
    resourceGroupName,
    contextCacheName,
    contextCacheContainerName,
    options,
  );
  return _getDeserialize(result);
}
