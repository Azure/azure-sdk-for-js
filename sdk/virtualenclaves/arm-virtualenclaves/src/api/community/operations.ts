// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MissionContext as Client } from "../index.js";
import type {
  CommunityResource,
  CommunityPatchModel,
  _CommunityResourceListResult,
  CheckAddressSpaceAvailabilityRequest,
  CheckAddressSpaceAvailabilityResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  communityResourceSerializer,
  communityResourceDeserializer,
  communityPatchModelSerializer,
  _communityResourceListResultDeserializer,
  checkAddressSpaceAvailabilityRequestSerializer,
  checkAddressSpaceAvailabilityResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CommunityCheckAddressSpaceAvailabilityOptionalParams,
  CommunityListBySubscriptionOptionalParams,
  CommunityListByResourceGroupOptionalParams,
  CommunityDeleteOptionalParams,
  CommunityUpdateOptionalParams,
  CommunityCreateOrUpdateOptionalParams,
  CommunityGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _checkAddressSpaceAvailabilitySend(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  checkAddressSpaceAvailabilityRequest: CheckAddressSpaceAvailabilityRequest,
  options: CommunityCheckAddressSpaceAvailabilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/communities/{communityName}/checkAddressSpaceAvailability{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: checkAddressSpaceAvailabilityRequestSerializer(checkAddressSpaceAvailabilityRequest),
  });
}

export async function _checkAddressSpaceAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckAddressSpaceAvailabilityResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return checkAddressSpaceAvailabilityResponseDeserializer(result.body);
}

/** Checks that the IP Address Space to be allocated for this Community is available. */
export async function checkAddressSpaceAvailability(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  checkAddressSpaceAvailabilityRequest: CheckAddressSpaceAvailabilityRequest,
  options: CommunityCheckAddressSpaceAvailabilityOptionalParams = {
    requestOptions: {},
  },
): Promise<CheckAddressSpaceAvailabilityResponse> {
  const result = await _checkAddressSpaceAvailabilitySend(
    context,
    resourceGroupName,
    communityName,
    checkAddressSpaceAvailabilityRequest,
    options,
  );
  return _checkAddressSpaceAvailabilityDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: CommunityListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Mission/communities{?api%2Dversion}",
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
): Promise<_CommunityResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _communityResourceListResultDeserializer(result.body);
}

/** List CommunityResource resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: CommunityListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CommunityResource> {
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
  options: CommunityListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/communities{?api%2Dversion}",
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
): Promise<_CommunityResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _communityResourceListResultDeserializer(result.body);
}

/** List CommunityResource resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: CommunityListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CommunityResource> {
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
  communityName: string,
  options: CommunityDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/communities/{communityName}{?api%2Dversion}",
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

/** Delete a CommunityResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  options: CommunityDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, communityName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  properties: CommunityPatchModel,
  options: CommunityUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/communities/{communityName}{?api%2Dversion}",
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
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: communityPatchModelSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<CommunityResource> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return communityResourceDeserializer(result.body);
}

/** Update a CommunityResource */
export function update(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  properties: CommunityPatchModel,
  options: CommunityUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CommunityResource>, CommunityResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, communityName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<CommunityResource>, CommunityResource>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  resource: CommunityResource,
  options: CommunityCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/communities/{communityName}{?api%2Dversion}",
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
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: communityResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<CommunityResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return communityResourceDeserializer(result.body);
}

/** Create a CommunityResource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  resource: CommunityResource,
  options: CommunityCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CommunityResource>, CommunityResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, communityName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<CommunityResource>, CommunityResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  options: CommunityGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/communities/{communityName}{?api%2Dversion}",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<CommunityResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return communityResourceDeserializer(result.body);
}

/** Get a CommunityResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  options: CommunityGetOptionalParams = { requestOptions: {} },
): Promise<CommunityResource> {
  const result = await _getSend(context, resourceGroupName, communityName, options);
  return _getDeserialize(result);
}
