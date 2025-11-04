// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisManagementContext as Client } from "../index.js";
import type {
  RedisLinkedServerWithProperties,
  RedisLinkedServerCreateParameters,
  _RedisLinkedServerWithPropertiesList,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  redisLinkedServerWithPropertiesDeserializer,
  redisLinkedServerCreateParametersSerializer,
  _redisLinkedServerWithPropertiesListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  LinkedServerListOptionalParams,
  LinkedServerDeleteOptionalParams,
  LinkedServerCreateOptionalParams,
  LinkedServerGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: LinkedServerListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{name}/linkedServers{?api%2Dversion}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_RedisLinkedServerWithPropertiesList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _redisLinkedServerWithPropertiesListDeserializer(result.body);
}

/** Gets the list of linked servers associated with this redis cache (requires Premium SKU). */
export function list(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: LinkedServerListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RedisLinkedServerWithProperties> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, name, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  linkedServerName: string,
  options: LinkedServerDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{name}/linkedServers/{linkedServerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      linkedServerName: linkedServerName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes the linked server from a redis cache (requires Premium SKU). */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  name: string,
  linkedServerName: string,
  options: LinkedServerDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, name, linkedServerName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  linkedServerName: string,
  parameters: RedisLinkedServerCreateParameters,
  options: LinkedServerCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{name}/linkedServers/{linkedServerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      linkedServerName: linkedServerName,
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
    body: redisLinkedServerCreateParametersSerializer(parameters),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<RedisLinkedServerWithProperties> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return redisLinkedServerWithPropertiesDeserializer(result.body);
}

/** Adds a linked server to the Redis cache (requires Premium SKU). */
export function create(
  context: Client,
  resourceGroupName: string,
  name: string,
  linkedServerName: string,
  parameters: RedisLinkedServerCreateParameters,
  options: LinkedServerCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RedisLinkedServerWithProperties>, RedisLinkedServerWithProperties> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, name, linkedServerName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<
    OperationState<RedisLinkedServerWithProperties>,
    RedisLinkedServerWithProperties
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  linkedServerName: string,
  options: LinkedServerGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{name}/linkedServers/{linkedServerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      linkedServerName: linkedServerName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<RedisLinkedServerWithProperties> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return redisLinkedServerWithPropertiesDeserializer(result.body);
}

/** Gets the detailed information about a linked server of a redis cache (requires Premium SKU). */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  linkedServerName: string,
  options: LinkedServerGetOptionalParams = { requestOptions: {} },
): Promise<RedisLinkedServerWithProperties> {
  const result = await _getSend(context, resourceGroupName, name, linkedServerName, options);
  return _getDeserialize(result);
}
