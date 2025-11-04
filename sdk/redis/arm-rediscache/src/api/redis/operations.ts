// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisManagementContext as Client } from "../index.js";
import type {
  RedisResource,
  RedisAccessKeys,
  RedisCreateParameters,
  RedisUpdateParameters,
  _RedisListResult,
  _NotificationListResponse,
  UpgradeNotification,
  RedisRegenerateKeyParameters,
  RedisRebootParameters,
  RedisForceRebootResponse,
  ImportRDBParameters,
  ExportRDBParameters,
  OperationStatusResult,
  CheckNameAvailabilityParameters,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  redisResourceDeserializer,
  redisAccessKeysDeserializer,
  redisCreateParametersSerializer,
  redisUpdateParametersSerializer,
  _redisListResultDeserializer,
  _notificationListResponseDeserializer,
  redisRegenerateKeyParametersSerializer,
  redisRebootParametersSerializer,
  redisForceRebootResponseDeserializer,
  importRDBParametersSerializer,
  exportRDBParametersSerializer,
  operationStatusResultDeserializer,
  checkNameAvailabilityParametersSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RedisCheckNameAvailabilityOptionalParams,
  RedisFlushCacheOptionalParams,
  RedisExportDataOptionalParams,
  RedisImportDataOptionalParams,
  RedisForceRebootOptionalParams,
  RedisRegenerateKeyOptionalParams,
  RedisListKeysOptionalParams,
  RedisListUpgradeNotificationsOptionalParams,
  RedisListBySubscriptionOptionalParams,
  RedisListByResourceGroupOptionalParams,
  RedisDeleteOptionalParams,
  RedisUpdateOptionalParams,
  RedisCreateOptionalParams,
  RedisGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _checkNameAvailabilitySend(
  context: Client,
  parameters: CheckNameAvailabilityParameters,
  options: RedisCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Cache/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: checkNameAvailabilityParametersSerializer(parameters),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Checks that the redis cache name is valid and is not already in use. */
export async function checkNameAvailability(
  context: Client,
  parameters: CheckNameAvailabilityParameters,
  options: RedisCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _checkNameAvailabilitySend(context, parameters, options);
  return _checkNameAvailabilityDeserialize(result);
}

export function _flushCacheSend(
  context: Client,
  resourceGroupName: string,
  cacheName: string,
  options: RedisFlushCacheOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{cacheName}/flush{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cacheName: cacheName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _flushCacheDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Deletes all of the keys in a cache. */
export function flushCache(
  context: Client,
  resourceGroupName: string,
  cacheName: string,
  options: RedisFlushCacheOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _flushCacheDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _flushCacheSend(context, resourceGroupName, cacheName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _exportDataSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  parameters: ExportRDBParameters,
  options: RedisExportDataOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{name}/export{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: exportRDBParametersSerializer(parameters),
  });
}

export async function _exportDataDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Export data from the redis cache to blobs in a container. */
export function exportData(
  context: Client,
  resourceGroupName: string,
  name: string,
  parameters: ExportRDBParameters,
  options: RedisExportDataOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _exportDataDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _exportDataSend(context, resourceGroupName, name, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _importDataSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  parameters: ImportRDBParameters,
  options: RedisImportDataOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{name}/import{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: importRDBParametersSerializer(parameters),
  });
}

export async function _importDataDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Import data into Redis cache. */
export function importData(
  context: Client,
  resourceGroupName: string,
  name: string,
  parameters: ImportRDBParameters,
  options: RedisImportDataOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _importDataDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _importDataSend(context, resourceGroupName, name, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _forceRebootSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  parameters: RedisRebootParameters,
  options: RedisForceRebootOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{name}/forceReboot{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: redisRebootParametersSerializer(parameters),
  });
}

export async function _forceRebootDeserialize(
  result: PathUncheckedResponse,
): Promise<RedisForceRebootResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return redisForceRebootResponseDeserializer(result.body);
}

/** Reboot specified Redis node(s). This operation requires write permission to the cache resource. There can be potential data loss. */
export async function forceReboot(
  context: Client,
  resourceGroupName: string,
  name: string,
  parameters: RedisRebootParameters,
  options: RedisForceRebootOptionalParams = { requestOptions: {} },
): Promise<RedisForceRebootResponse> {
  const result = await _forceRebootSend(context, resourceGroupName, name, parameters, options);
  return _forceRebootDeserialize(result);
}

export function _regenerateKeySend(
  context: Client,
  resourceGroupName: string,
  name: string,
  parameters: RedisRegenerateKeyParameters,
  options: RedisRegenerateKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{name}/regenerateKey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: redisRegenerateKeyParametersSerializer(parameters),
  });
}

export async function _regenerateKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<RedisAccessKeys> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return redisAccessKeysDeserializer(result.body);
}

/** Regenerate Redis cache's access keys. This operation requires write permission to the cache resource. */
export async function regenerateKey(
  context: Client,
  resourceGroupName: string,
  name: string,
  parameters: RedisRegenerateKeyParameters,
  options: RedisRegenerateKeyOptionalParams = { requestOptions: {} },
): Promise<RedisAccessKeys> {
  const result = await _regenerateKeySend(context, resourceGroupName, name, parameters, options);
  return _regenerateKeyDeserialize(result);
}

export function _listKeysSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: RedisListKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{name}/listKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<RedisAccessKeys> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return redisAccessKeysDeserializer(result.body);
}

/** Retrieve a Redis cache's access keys. This operation requires write permission to the cache resource. */
export async function listKeys(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: RedisListKeysOptionalParams = { requestOptions: {} },
): Promise<RedisAccessKeys> {
  const result = await _listKeysSend(context, resourceGroupName, name, options);
  return _listKeysDeserialize(result);
}

export function _listUpgradeNotificationsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  history: number,
  options: RedisListUpgradeNotificationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{name}/listUpgradeNotifications{?api%2Dversion,history}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion,
      history: history,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listUpgradeNotificationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_NotificationListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _notificationListResponseDeserializer(result.body);
}

/** [Deprecated] Gets any upgrade notifications for a Redis cache. */
export function listUpgradeNotifications(
  context: Client,
  resourceGroupName: string,
  name: string,
  history: number,
  options: RedisListUpgradeNotificationsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<UpgradeNotification> {
  return buildPagedAsyncIterator(
    context,
    () => _listUpgradeNotificationsSend(context, resourceGroupName, name, history, options),
    _listUpgradeNotificationsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listBySubscriptionSend(
  context: Client,
  options: RedisListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Cache/redis{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_RedisListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _redisListResultDeserializer(result.body);
}

/** Gets all Redis caches in the specified subscription. */
export function listBySubscription(
  context: Client,
  options: RedisListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RedisResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: RedisListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_RedisListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _redisListResultDeserializer(result.body);
}

/** Lists all Redis caches in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: RedisListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RedisResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: RedisDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion,
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

/** Deletes a Redis cache. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: RedisDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, name, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  parameters: RedisUpdateParameters,
  options: RedisUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: redisUpdateParametersSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<RedisResource> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return redisResourceDeserializer(result.body);
}

/** Update an existing Redis cache. */
export function update(
  context: Client,
  resourceGroupName: string,
  name: string,
  parameters: RedisUpdateParameters,
  options: RedisUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RedisResource>, RedisResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _updateSend(context, resourceGroupName, name, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<RedisResource>, RedisResource>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  parameters: RedisCreateParameters,
  options: RedisCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: redisCreateParametersSerializer(parameters),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<RedisResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return redisResourceDeserializer(result.body);
}

/** Create or replace (overwrite/recreate, with potential downtime) an existing Redis cache. */
export function create(
  context: Client,
  resourceGroupName: string,
  name: string,
  parameters: RedisCreateParameters,
  options: RedisCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RedisResource>, RedisResource> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createSend(context, resourceGroupName, name, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<RedisResource>, RedisResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: RedisGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RedisResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return redisResourceDeserializer(result.body);
}

/** Gets a Redis cache (resource description). */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: RedisGetOptionalParams = { requestOptions: {} },
): Promise<RedisResource> {
  const result = await _getSend(context, resourceGroupName, name, options);
  return _getDeserialize(result);
}
