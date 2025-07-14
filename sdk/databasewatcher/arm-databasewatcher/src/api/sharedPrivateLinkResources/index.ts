// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DatabaseWatcherContext as Client,
  SharedPrivateLinkResourcesCreateOptionalParams,
  SharedPrivateLinkResourcesDeleteOptionalParams,
  SharedPrivateLinkResourcesGetOptionalParams,
  SharedPrivateLinkResourcesListByWatcherOptionalParams,
} from "../index.js";
import {
  SharedPrivateLinkResource,
  sharedPrivateLinkResourceSerializer,
  sharedPrivateLinkResourceDeserializer,
  errorResponseDeserializer,
  _SharedPrivateLinkResourceListResult,
  _sharedPrivateLinkResourceListResultDeserializer,
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

export function _sharedPrivateLinkResourcesListByWatcherSend(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  options: SharedPrivateLinkResourcesListByWatcherOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/sharedPrivateLinkResources",
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

export async function _sharedPrivateLinkResourcesListByWatcherDeserialize(
  result: PathUncheckedResponse,
): Promise<_SharedPrivateLinkResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _sharedPrivateLinkResourceListResultDeserializer(result.body);
}

/** List SharedPrivateLinkResource resources by Watcher */
export function sharedPrivateLinkResourcesListByWatcher(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  options: SharedPrivateLinkResourcesListByWatcherOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SharedPrivateLinkResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _sharedPrivateLinkResourcesListByWatcherSend(
        context,
        resourceGroupName,
        watcherName,
        options,
      ),
    _sharedPrivateLinkResourcesListByWatcherDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _sharedPrivateLinkResourcesDeleteSend(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  sharedPrivateLinkResourceName: string,
  options: SharedPrivateLinkResourcesDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}",
      context.subscriptionId,
      resourceGroupName,
      watcherName,
      sharedPrivateLinkResourceName,
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

export async function _sharedPrivateLinkResourcesDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a SharedPrivateLinkResource */
export function sharedPrivateLinkResourcesDelete(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  sharedPrivateLinkResourceName: string,
  options: SharedPrivateLinkResourcesDeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _sharedPrivateLinkResourcesDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _sharedPrivateLinkResourcesDeleteSend(
          context,
          resourceGroupName,
          watcherName,
          sharedPrivateLinkResourceName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _sharedPrivateLinkResourcesCreateSend(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  sharedPrivateLinkResourceName: string,
  resource: SharedPrivateLinkResource,
  options: SharedPrivateLinkResourcesCreateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}",
      context.subscriptionId,
      resourceGroupName,
      watcherName,
      sharedPrivateLinkResourceName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: sharedPrivateLinkResourceSerializer(resource),
    });
}

export async function _sharedPrivateLinkResourcesCreateDeserialize(
  result: PathUncheckedResponse,
): Promise<SharedPrivateLinkResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return sharedPrivateLinkResourceDeserializer(result.body);
}

/** Create a SharedPrivateLinkResource */
export function sharedPrivateLinkResourcesCreate(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  sharedPrivateLinkResourceName: string,
  resource: SharedPrivateLinkResource,
  options: SharedPrivateLinkResourcesCreateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<SharedPrivateLinkResource>, SharedPrivateLinkResource> {
  return getLongRunningPoller(
    context,
    _sharedPrivateLinkResourcesCreateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _sharedPrivateLinkResourcesCreateSend(
          context,
          resourceGroupName,
          watcherName,
          sharedPrivateLinkResourceName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<SharedPrivateLinkResource>, SharedPrivateLinkResource>;
}

export function _sharedPrivateLinkResourcesGetSend(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  sharedPrivateLinkResourceName: string,
  options: SharedPrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}",
      context.subscriptionId,
      resourceGroupName,
      watcherName,
      sharedPrivateLinkResourceName,
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

export async function _sharedPrivateLinkResourcesGetDeserialize(
  result: PathUncheckedResponse,
): Promise<SharedPrivateLinkResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return sharedPrivateLinkResourceDeserializer(result.body);
}

/** Get a SharedPrivateLinkResource */
export async function sharedPrivateLinkResourcesGet(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  sharedPrivateLinkResourceName: string,
  options: SharedPrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): Promise<SharedPrivateLinkResource> {
  const result = await _sharedPrivateLinkResourcesGetSend(
    context,
    resourceGroupName,
    watcherName,
    sharedPrivateLinkResourceName,
    options,
  );
  return _sharedPrivateLinkResourcesGetDeserialize(result);
}
