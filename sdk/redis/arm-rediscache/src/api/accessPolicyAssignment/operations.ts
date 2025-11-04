// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisManagementContext as Client } from "../index.js";
import type {
  RedisCacheAccessPolicyAssignment,
  _RedisCacheAccessPolicyAssignmentList,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  redisCacheAccessPolicyAssignmentSerializer,
  redisCacheAccessPolicyAssignmentDeserializer,
  _redisCacheAccessPolicyAssignmentListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AccessPolicyAssignmentListOptionalParams,
  AccessPolicyAssignmentDeleteOptionalParams,
  AccessPolicyAssignmentCreateUpdateOptionalParams,
  AccessPolicyAssignmentGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  cacheName: string,
  options: AccessPolicyAssignmentListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{cacheName}/accessPolicyAssignments{?api%2Dversion}",
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
): Promise<_RedisCacheAccessPolicyAssignmentList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _redisCacheAccessPolicyAssignmentListDeserializer(result.body);
}

/** Gets the list of access policy assignments associated with this redis cache */
export function list(
  context: Client,
  resourceGroupName: string,
  cacheName: string,
  options: AccessPolicyAssignmentListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RedisCacheAccessPolicyAssignment> {
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
  accessPolicyAssignmentName: string,
  options: AccessPolicyAssignmentDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{cacheName}/accessPolicyAssignments/{accessPolicyAssignmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cacheName: cacheName,
      accessPolicyAssignmentName: accessPolicyAssignmentName,
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

/** Deletes the access policy assignment from a redis cache */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  cacheName: string,
  accessPolicyAssignmentName: string,
  options: AccessPolicyAssignmentDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, cacheName, accessPolicyAssignmentName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createUpdateSend(
  context: Client,
  resourceGroupName: string,
  cacheName: string,
  accessPolicyAssignmentName: string,
  parameters: RedisCacheAccessPolicyAssignment,
  options: AccessPolicyAssignmentCreateUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{cacheName}/accessPolicyAssignments/{accessPolicyAssignmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cacheName: cacheName,
      accessPolicyAssignmentName: accessPolicyAssignmentName,
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
    body: redisCacheAccessPolicyAssignmentSerializer(parameters),
  });
}

export async function _createUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<RedisCacheAccessPolicyAssignment> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return redisCacheAccessPolicyAssignmentDeserializer(result.body);
}

/** Adds the access policy assignment to the specified users */
export function createUpdate(
  context: Client,
  resourceGroupName: string,
  cacheName: string,
  accessPolicyAssignmentName: string,
  parameters: RedisCacheAccessPolicyAssignment,
  options: AccessPolicyAssignmentCreateUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<RedisCacheAccessPolicyAssignment>, RedisCacheAccessPolicyAssignment> {
  return getLongRunningPoller(context, _createUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createUpdateSend(
        context,
        resourceGroupName,
        cacheName,
        accessPolicyAssignmentName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<
    OperationState<RedisCacheAccessPolicyAssignment>,
    RedisCacheAccessPolicyAssignment
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  cacheName: string,
  accessPolicyAssignmentName: string,
  options: AccessPolicyAssignmentGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{cacheName}/accessPolicyAssignments/{accessPolicyAssignmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cacheName: cacheName,
      accessPolicyAssignmentName: accessPolicyAssignmentName,
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
): Promise<RedisCacheAccessPolicyAssignment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return redisCacheAccessPolicyAssignmentDeserializer(result.body);
}

/** Gets the list of assignments for an access policy of a redis cache */
export async function get(
  context: Client,
  resourceGroupName: string,
  cacheName: string,
  accessPolicyAssignmentName: string,
  options: AccessPolicyAssignmentGetOptionalParams = { requestOptions: {} },
): Promise<RedisCacheAccessPolicyAssignment> {
  const result = await _getSend(
    context,
    resourceGroupName,
    cacheName,
    accessPolicyAssignmentName,
    options,
  );
  return _getDeserialize(result);
}
