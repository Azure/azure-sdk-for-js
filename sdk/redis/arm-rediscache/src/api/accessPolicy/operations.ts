// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisManagementContext as Client } from "../index.js";
import type { RedisCacheAccessPolicy, _RedisCacheAccessPolicyList } from "../../models/models.js";
import {
  errorResponseDeserializer,
  redisCacheAccessPolicySerializer,
  redisCacheAccessPolicyDeserializer,
  _redisCacheAccessPolicyListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AccessPolicyListOptionalParams,
  AccessPolicyDeleteOptionalParams,
  AccessPolicyCreateUpdateOptionalParams,
  AccessPolicyGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  cacheName: string,
  options: AccessPolicyListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{cacheName}/accessPolicies{?api%2Dversion}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_RedisCacheAccessPolicyList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _redisCacheAccessPolicyListDeserializer(result.body);
}

/** Gets the list of access policies associated with this redis cache */
export function list(
  context: Client,
  resourceGroupName: string,
  cacheName: string,
  options: AccessPolicyListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RedisCacheAccessPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, cacheName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  cacheName: string,
  accessPolicyName: string,
  options: AccessPolicyDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{cacheName}/accessPolicies/{accessPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cacheName: cacheName,
      accessPolicyName: accessPolicyName,
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

/** Deletes the access policy from a redis cache */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  cacheName: string,
  accessPolicyName: string,
  options: AccessPolicyDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, cacheName, accessPolicyName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createUpdateSend(
  context: Client,
  resourceGroupName: string,
  cacheName: string,
  accessPolicyName: string,
  parameters: RedisCacheAccessPolicy,
  options: AccessPolicyCreateUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{cacheName}/accessPolicies/{accessPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cacheName: cacheName,
      accessPolicyName: accessPolicyName,
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
    body: redisCacheAccessPolicySerializer(parameters),
  });
}

export async function _createUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<RedisCacheAccessPolicy> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return redisCacheAccessPolicyDeserializer(result.body);
}

/** Adds an access policy to the redis cache */
export function createUpdate(
  context: Client,
  resourceGroupName: string,
  cacheName: string,
  accessPolicyName: string,
  parameters: RedisCacheAccessPolicy,
  options: AccessPolicyCreateUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RedisCacheAccessPolicy>, RedisCacheAccessPolicy> {
  return getLongRunningPoller(context, _createUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createUpdateSend(
        context,
        resourceGroupName,
        cacheName,
        accessPolicyName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<RedisCacheAccessPolicy>, RedisCacheAccessPolicy>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  cacheName: string,
  accessPolicyName: string,
  options: AccessPolicyGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{cacheName}/accessPolicies/{accessPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cacheName: cacheName,
      accessPolicyName: accessPolicyName,
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
): Promise<RedisCacheAccessPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return redisCacheAccessPolicyDeserializer(result.body);
}

/** Gets the detailed information about an access policy of a redis cache */
export async function get(
  context: Client,
  resourceGroupName: string,
  cacheName: string,
  accessPolicyName: string,
  options: AccessPolicyGetOptionalParams = { requestOptions: {} },
): Promise<RedisCacheAccessPolicy> {
  const result = await _getSend(context, resourceGroupName, cacheName, accessPolicyName, options);
  return _getDeserialize(result);
}
