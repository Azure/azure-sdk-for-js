// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DatabaseWatcherContext as Client,
  WatchersCreateOrUpdateOptionalParams,
  WatchersDeleteOptionalParams,
  WatchersGetOptionalParams,
  WatchersListByResourceGroupOptionalParams,
  WatchersListBySubscriptionOptionalParams,
  WatchersStartOptionalParams,
  WatchersStopOptionalParams,
  WatchersUpdateOptionalParams,
} from "../index.js";
import {
  errorResponseDeserializer,
  Watcher,
  watcherSerializer,
  watcherDeserializer,
  WatcherUpdate,
  watcherUpdateSerializer,
  _WatcherListResult,
  _watcherListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _watchersStopSend(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  options: WatchersStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/stop",
      context.subscriptionId,
      resourceGroupName,
      watcherName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _watchersStopDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** The action to stop monitoring all targets configured for a database watcher. */
export function watchersStop(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  options: WatchersStopOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _watchersStopDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _watchersStopSend(context, resourceGroupName, watcherName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _watchersStartSend(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  options: WatchersStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/start",
      context.subscriptionId,
      resourceGroupName,
      watcherName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _watchersStartDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** The action to start monitoring all targets configured for a database watcher. */
export function watchersStart(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  options: WatchersStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _watchersStartDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _watchersStartSend(context, resourceGroupName, watcherName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _watchersListBySubscriptionSend(
  context: Client,
  options: WatchersListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.DatabaseWatcher/watchers",
      context.subscriptionId,
    )
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _watchersListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_WatcherListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _watcherListResultDeserializer(result.body);
}

/** List Watcher resources by subscription ID */
export function watchersListBySubscription(
  context: Client,
  options: WatchersListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Watcher> {
  return buildPagedAsyncIterator(
    context,
    () => _watchersListBySubscriptionSend(context, options),
    _watchersListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _watchersListByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: WatchersListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers",
      context.subscriptionId,
      resourceGroupName,
    )
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _watchersListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_WatcherListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _watcherListResultDeserializer(result.body);
}

/** List Watcher resources by resource group */
export function watchersListByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: WatchersListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Watcher> {
  return buildPagedAsyncIterator(
    context,
    () => _watchersListByResourceGroupSend(context, resourceGroupName, options),
    _watchersListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _watchersDeleteSend(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  options: WatchersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}",
      context.subscriptionId,
      resourceGroupName,
      watcherName,
    )
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _watchersDeleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a Watcher */
export function watchersDelete(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  options: WatchersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _watchersDeleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _watchersDeleteSend(context, resourceGroupName, watcherName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _watchersUpdateSend(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  properties: WatcherUpdate,
  options: WatchersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}",
      context.subscriptionId,
      resourceGroupName,
      watcherName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: watcherUpdateSerializer(properties),
    });
}

export async function _watchersUpdateDeserialize(result: PathUncheckedResponse): Promise<Watcher> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return watcherDeserializer(result.body);
}

/** Update a Watcher */
export function watchersUpdate(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  properties: WatcherUpdate,
  options: WatchersUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Watcher>, Watcher> {
  return getLongRunningPoller(context, _watchersUpdateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _watchersUpdateSend(context, resourceGroupName, watcherName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<Watcher>, Watcher>;
}

export function _watchersCreateOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  resource: Watcher,
  options: WatchersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}",
      context.subscriptionId,
      resourceGroupName,
      watcherName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: watcherSerializer(resource),
    });
}

export async function _watchersCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Watcher> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return watcherDeserializer(result.body);
}

/** Create a Watcher */
export function watchersCreateOrUpdate(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  resource: Watcher,
  options: WatchersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Watcher>, Watcher> {
  return getLongRunningPoller(context, _watchersCreateOrUpdateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _watchersCreateOrUpdateSend(context, resourceGroupName, watcherName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Watcher>, Watcher>;
}

export function _watchersGetSend(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  options: WatchersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}",
      context.subscriptionId,
      resourceGroupName,
      watcherName,
    )
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _watchersGetDeserialize(result: PathUncheckedResponse): Promise<Watcher> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return watcherDeserializer(result.body);
}

/** Get a Watcher */
export async function watchersGet(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  options: WatchersGetOptionalParams = { requestOptions: {} },
): Promise<Watcher> {
  const result = await _watchersGetSend(context, resourceGroupName, watcherName, options);
  return _watchersGetDeserialize(result);
}
