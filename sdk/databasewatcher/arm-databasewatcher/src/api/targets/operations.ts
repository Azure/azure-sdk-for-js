// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DatabaseWatcherContext as Client } from "../index.js";
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
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import {
  TargetsListByWatcherOptionalParams,
  TargetsDeleteOptionalParams,
  TargetsCreateOrUpdateOptionalParams,
  TargetsGetOptionalParams,
} from "./options.js";

export function _listByWatcherSend(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  options: TargetsListByWatcherOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/targets{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      watcherName: watcherName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listByWatcherDeserialize(
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
export function listByWatcher(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  options: TargetsListByWatcherOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Target> {
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
  targetName: string,
  options: TargetsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/targets/{targetName}{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      watcherName: watcherName,
      targetName: targetName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a Target */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  targetName: string,
  options: TargetsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    watcherName,
    targetName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  targetName: string,
  resource: Target,
  options: TargetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/targets/{targetName}{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      watcherName: watcherName,
      targetName: targetName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: targetSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
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
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  targetName: string,
  resource: Target,
  options: TargetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Target> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    watcherName,
    targetName,
    resource,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  targetName: string,
  options: TargetsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/targets/{targetName}{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      watcherName: watcherName,
      targetName: targetName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<Target> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return targetDeserializer(result.body);
}

/** Get a Target */
export async function get(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  targetName: string,
  options: TargetsGetOptionalParams = { requestOptions: {} },
): Promise<Target> {
  const result = await _getSend(
    context,
    resourceGroupName,
    watcherName,
    targetName,
    options,
  );
  return _getDeserialize(result);
}
