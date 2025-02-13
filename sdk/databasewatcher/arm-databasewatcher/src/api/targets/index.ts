// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DatabaseWatcherContext as Client,
  TargetsCreateOrUpdateOptionalParams,
  TargetsDeleteOptionalParams,
  TargetsGetOptionalParams,
  TargetsListByWatcherOptionalParams,
} from "../index.js";
import {
  errorResponseDeserializer,
  Target,
  targetSerializer,
  targetDeserializer,
  _TargetListResult,
  _targetListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _targetsListByWatcherSend(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  options: TargetsListByWatcherOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/targets",
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

export async function _targetsListByWatcherDeserialize(
  result: PathUncheckedResponse,
): Promise<_TargetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _targetListResultDeserializer(result.body);
}

/** List Target resources by Watcher */
export function targetsListByWatcher(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  options: TargetsListByWatcherOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Target> {
  return buildPagedAsyncIterator(
    context,
    () => _targetsListByWatcherSend(context, resourceGroupName, watcherName, options),
    _targetsListByWatcherDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _targetsDeleteSend(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  targetName: string,
  options: TargetsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/targets/{targetName}",
      context.subscriptionId,
      resourceGroupName,
      watcherName,
      targetName,
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

export async function _targetsDeleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a Target */
export async function targetsDelete(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  targetName: string,
  options: TargetsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _targetsDeleteSend(
    context,
    resourceGroupName,
    watcherName,
    targetName,
    options,
  );
  return _targetsDeleteDeserialize(result);
}

export function _targetsCreateOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  targetName: string,
  resource: Target,
  options: TargetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/targets/{targetName}",
      context.subscriptionId,
      resourceGroupName,
      watcherName,
      targetName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: targetSerializer(resource),
    });
}

export async function _targetsCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Target> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return targetDeserializer(result.body);
}

/** Create a Target */
export async function targetsCreateOrUpdate(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  targetName: string,
  resource: Target,
  options: TargetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Target> {
  const result = await _targetsCreateOrUpdateSend(
    context,
    resourceGroupName,
    watcherName,
    targetName,
    resource,
    options,
  );
  return _targetsCreateOrUpdateDeserialize(result);
}

export function _targetsGetSend(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  targetName: string,
  options: TargetsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/targets/{targetName}",
      context.subscriptionId,
      resourceGroupName,
      watcherName,
      targetName,
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

export async function _targetsGetDeserialize(result: PathUncheckedResponse): Promise<Target> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return targetDeserializer(result.body);
}

/** Get a Target */
export async function targetsGet(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  targetName: string,
  options: TargetsGetOptionalParams = { requestOptions: {} },
): Promise<Target> {
  const result = await _targetsGetSend(
    context,
    resourceGroupName,
    watcherName,
    targetName,
    options,
  );
  return _targetsGetDeserialize(result);
}
