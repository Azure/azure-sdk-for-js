// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisManagementContext as Client } from "../index.js";
import type {
  RedisPatchSchedule,
  DefaultName,
  _RedisPatchScheduleListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  redisPatchScheduleSerializer,
  redisPatchScheduleDeserializer,
  _redisPatchScheduleListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PatchSchedulesListByRedisResourceOptionalParams,
  PatchSchedulesDeleteOptionalParams,
  PatchSchedulesCreateOrUpdateOptionalParams,
  PatchSchedulesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByRedisResourceSend(
  context: Client,
  resourceGroupName: string,
  cacheName: string,
  options: PatchSchedulesListByRedisResourceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{cacheName}/patchSchedules{?api%2Dversion}",
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
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByRedisResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_RedisPatchScheduleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _redisPatchScheduleListResultDeserializer(result.body);
}

/** Gets all patch schedules in the specified redis cache (there is only one). */
export function listByRedisResource(
  context: Client,
  resourceGroupName: string,
  cacheName: string,
  options: PatchSchedulesListByRedisResourceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<RedisPatchSchedule> {
  return buildPagedAsyncIterator(
    context,
    () => _listByRedisResourceSend(context, resourceGroupName, cacheName, options),
    _listByRedisResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  defaultParam: DefaultName,
  options: PatchSchedulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{name}/patchSchedules/{default}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      default: defaultParam,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes the patching schedule of a redis cache. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  name: string,
  defaultParam: DefaultName,
  options: PatchSchedulesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, name, defaultParam, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  defaultParam: DefaultName,
  parameters: RedisPatchSchedule,
  options: PatchSchedulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{name}/patchSchedules/{default}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      default: defaultParam,
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
    body: redisPatchScheduleSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<RedisPatchSchedule> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return redisPatchScheduleDeserializer(result.body);
}

/** Create or replace the patching schedule for Redis cache. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  name: string,
  defaultParam: DefaultName,
  parameters: RedisPatchSchedule,
  options: PatchSchedulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<RedisPatchSchedule> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    name,
    defaultParam,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  defaultParam: DefaultName,
  options: PatchSchedulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{name}/patchSchedules/{default}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      default: defaultParam,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RedisPatchSchedule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return redisPatchScheduleDeserializer(result.body);
}

/** Gets the patching schedule of a redis cache. */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  defaultParam: DefaultName,
  options: PatchSchedulesGetOptionalParams = { requestOptions: {} },
): Promise<RedisPatchSchedule> {
  const result = await _getSend(context, resourceGroupName, name, defaultParam, options);
  return _getDeserialize(result);
}
