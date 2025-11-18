// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MissionContext as Client } from "../index.js";
import type {
  TransitHubResource,
  TransitHubPatchModel,
  _TransitHubResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  transitHubResourceSerializer,
  transitHubResourceDeserializer,
  transitHubPatchModelSerializer,
  _transitHubResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TransitHubListBySubscriptionOptionalParams,
  TransitHubListByCommunityResourceOptionalParams,
  TransitHubDeleteOptionalParams,
  TransitHubUpdateOptionalParams,
  TransitHubCreateOrUpdateOptionalParams,
  TransitHubGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  communityName: string,
  options: TransitHubListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Mission/communities/{communityName}/transitHubs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      communityName: communityName,
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
): Promise<_TransitHubResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _transitHubResourceListResultDeserializer(result.body);
}

/** List TransitHubResource resources by subscription ID */
export function listBySubscription(
  context: Client,
  communityName: string,
  options: TransitHubListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TransitHubResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, communityName, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByCommunityResourceSend(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  options: TransitHubListByCommunityResourceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/communities/{communityName}/transitHubs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      communityName: communityName,
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

export async function _listByCommunityResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_TransitHubResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _transitHubResourceListResultDeserializer(result.body);
}

/** List TransitHubResource resources by CommunityResource */
export function listByCommunityResource(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  options: TransitHubListByCommunityResourceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<TransitHubResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByCommunityResourceSend(context, resourceGroupName, communityName, options),
    _listByCommunityResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  transitHubName: string,
  options: TransitHubDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/communities/{communityName}/transitHubs/{transitHubName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      communityName: communityName,
      transitHubName: transitHubName,
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

/** Delete a TransitHubResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  transitHubName: string,
  options: TransitHubDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, communityName, transitHubName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  transitHubName: string,
  properties: TransitHubPatchModel,
  options: TransitHubUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/communities/{communityName}/transitHubs/{transitHubName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      communityName: communityName,
      transitHubName: transitHubName,
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
    body: transitHubPatchModelSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<TransitHubResource> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return transitHubResourceDeserializer(result.body);
}

/** Update a TransitHubResource */
export function update(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  transitHubName: string,
  properties: TransitHubPatchModel,
  options: TransitHubUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TransitHubResource>, TransitHubResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, communityName, transitHubName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<TransitHubResource>, TransitHubResource>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  transitHubName: string,
  resource: TransitHubResource,
  options: TransitHubCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/communities/{communityName}/transitHubs/{transitHubName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      communityName: communityName,
      transitHubName: transitHubName,
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
    body: transitHubResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<TransitHubResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return transitHubResourceDeserializer(result.body);
}

/** Create a TransitHubResource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  transitHubName: string,
  resource: TransitHubResource,
  options: TransitHubCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TransitHubResource>, TransitHubResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        communityName,
        transitHubName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<TransitHubResource>, TransitHubResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  transitHubName: string,
  options: TransitHubGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/communities/{communityName}/transitHubs/{transitHubName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      communityName: communityName,
      transitHubName: transitHubName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<TransitHubResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return transitHubResourceDeserializer(result.body);
}

/** Get a TransitHubResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  transitHubName: string,
  options: TransitHubGetOptionalParams = { requestOptions: {} },
): Promise<TransitHubResource> {
  const result = await _getSend(context, resourceGroupName, communityName, transitHubName, options);
  return _getDeserialize(result);
}
