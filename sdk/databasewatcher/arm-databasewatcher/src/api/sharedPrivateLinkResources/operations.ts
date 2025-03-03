// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DatabaseWatcherContext as Client } from "../index.js";
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
import {
  SharedPrivateLinkResourcesListByWatcherOptionalParams,
  SharedPrivateLinkResourcesDeleteOptionalParams,
  SharedPrivateLinkResourcesCreateOptionalParams,
  SharedPrivateLinkResourcesGetOptionalParams,
} from "./options.js";

export function _listByWatcherSend(
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

export async function _listByWatcherDeserialize(
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
export function listByWatcher(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  options: SharedPrivateLinkResourcesListByWatcherOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SharedPrivateLinkResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByWatcherSend(context, resourceGroupName, watcherName, options),
    _listByWatcherDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
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

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a SharedPrivateLinkResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  sharedPrivateLinkResourceName: string,
  options: SharedPrivateLinkResourcesDeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, watcherName, sharedPrivateLinkResourceName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createSend(
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

export async function _createDeserialize(
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
export function create(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  sharedPrivateLinkResourceName: string,
  resource: SharedPrivateLinkResource,
  options: SharedPrivateLinkResourcesCreateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<SharedPrivateLinkResource>, SharedPrivateLinkResource> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        watcherName,
        sharedPrivateLinkResourceName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<SharedPrivateLinkResource>, SharedPrivateLinkResource>;
}

export function _getSend(
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

export async function _getDeserialize(
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
export async function get(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  sharedPrivateLinkResourceName: string,
  options: SharedPrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): Promise<SharedPrivateLinkResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    watcherName,
    sharedPrivateLinkResourceName,
    options,
  );
  return _getDeserialize(result);
}
