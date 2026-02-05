// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext as Client } from "../index.js";
import type {
  _ResourceAnchorListResult,
  ResourceAnchor,
  ResourceAnchorUpdate,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _resourceAnchorListResultDeserializer,
  resourceAnchorSerializer,
  resourceAnchorDeserializer,
  resourceAnchorUpdateSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ResourceAnchorsListByResourceGroupOptionalParams,
  ResourceAnchorsDeleteOptionalParams,
  ResourceAnchorsUpdateOptionalParams,
  ResourceAnchorsGetOptionalParams,
  ResourceAnchorsCreateOrUpdateOptionalParams,
  ResourceAnchorsListBySubscriptionOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ResourceAnchorsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/resourceAnchors{?api%2Dversion}",
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
): Promise<_ResourceAnchorListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _resourceAnchorListResultDeserializer(result.body);
}

/** List ResourceAnchor resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ResourceAnchorsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ResourceAnchor> {
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
  resourceAnchorName: string,
  options: ResourceAnchorsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/resourceAnchors/{resourceAnchorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceAnchorName: resourceAnchorName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
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

/** Delete a ResourceAnchor */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  resourceAnchorName: string,
  options: ResourceAnchorsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, resourceAnchorName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  resourceAnchorName: string,
  properties: ResourceAnchorUpdate,
  options: ResourceAnchorsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/resourceAnchors/{resourceAnchorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceAnchorName: resourceAnchorName,
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
    body: resourceAnchorUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ResourceAnchor> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return resourceAnchorDeserializer(result.body);
}

/** Update a ResourceAnchor */
export function update(
  context: Client,
  resourceGroupName: string,
  resourceAnchorName: string,
  properties: ResourceAnchorUpdate,
  options: ResourceAnchorsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ResourceAnchor>, ResourceAnchor> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, resourceAnchorName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ResourceAnchor>, ResourceAnchor>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceAnchorName: string,
  options: ResourceAnchorsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/resourceAnchors/{resourceAnchorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceAnchorName: resourceAnchorName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ResourceAnchor> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return resourceAnchorDeserializer(result.body);
}

/** Get a ResourceAnchor */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceAnchorName: string,
  options: ResourceAnchorsGetOptionalParams = { requestOptions: {} },
): Promise<ResourceAnchor> {
  const result = await _getSend(context, resourceGroupName, resourceAnchorName, options);
  return _getDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  resourceAnchorName: string,
  resource: ResourceAnchor,
  options: ResourceAnchorsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/resourceAnchors/{resourceAnchorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceAnchorName: resourceAnchorName,
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
    body: resourceAnchorSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourceAnchor> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return resourceAnchorDeserializer(result.body);
}

/** Create a ResourceAnchor */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  resourceAnchorName: string,
  resource: ResourceAnchor,
  options: ResourceAnchorsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ResourceAnchor>, ResourceAnchor> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, resourceAnchorName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<ResourceAnchor>, ResourceAnchor>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: ResourceAnchorsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/resourceAnchors{?api%2Dversion}",
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
): Promise<_ResourceAnchorListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _resourceAnchorListResultDeserializer(result.body);
}

/** List ResourceAnchor resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: ResourceAnchorsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ResourceAnchor> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
