// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgriculturePlatformContext as Client } from "../index.js";
import {
  AgriServiceResource,
  agriServiceResourceSerializer,
  agriServiceResourceDeserializer,
  errorResponseDeserializer,
  AgriServiceResourceUpdate,
  agriServiceResourceUpdateSerializer,
  _AgriServiceResourceListResult,
  _agriServiceResourceListResultDeserializer,
  AvailableAgriSolutionListResult,
  availableAgriSolutionListResultDeserializer,
} from "../../models/models.js";
import {
  AgriServiceListAvailableSolutionsOptionalParams,
  AgriServiceListBySubscriptionOptionalParams,
  AgriServiceListByResourceGroupOptionalParams,
  AgriServiceDeleteOptionalParams,
  AgriServiceUpdateOptionalParams,
  AgriServiceCreateOrUpdateOptionalParams,
  AgriServiceGetOptionalParams,
} from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listAvailableSolutionsSend(
  context: Client,
  resourceGroupName: string,
  agriServiceResourceName: string,
  options: AgriServiceListAvailableSolutionsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AgriculturePlatform/agriServices/{agriServiceResourceName}/listAvailableSolutions{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agriServiceResourceName: agriServiceResourceName,
      "api-version": context.apiVersion,
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

export async function _listAvailableSolutionsDeserialize(
  result: PathUncheckedResponse,
): Promise<AvailableAgriSolutionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return availableAgriSolutionListResultDeserializer(result.body);
}

/** Returns the list of available agri solutions. */
export async function listAvailableSolutions(
  context: Client,
  resourceGroupName: string,
  agriServiceResourceName: string,
  options: AgriServiceListAvailableSolutionsOptionalParams = {
    requestOptions: {},
  },
): Promise<AvailableAgriSolutionListResult> {
  const result = await _listAvailableSolutionsSend(
    context,
    resourceGroupName,
    agriServiceResourceName,
    options,
  );
  return _listAvailableSolutionsDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: AgriServiceListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AgriculturePlatform/agriServices{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      "api-version": context.apiVersion,
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
): Promise<_AgriServiceResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _agriServiceResourceListResultDeserializer(result.body);
}

/** List AgriServiceResource resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: AgriServiceListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AgriServiceResource> {
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
  options: AgriServiceListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AgriculturePlatform/agriServices{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api-version": context.apiVersion,
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
): Promise<_AgriServiceResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _agriServiceResourceListResultDeserializer(result.body);
}

/** List AgriServiceResource resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: AgriServiceListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AgriServiceResource> {
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
  agriServiceResourceName: string,
  options: AgriServiceDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AgriculturePlatform/agriServices/{agriServiceResourceName}{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agriServiceResourceName: agriServiceResourceName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
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

/** Delete a AgriServiceResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  agriServiceResourceName: string,
  options: AgriServiceDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, agriServiceResourceName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  agriServiceResourceName: string,
  properties: AgriServiceResourceUpdate,
  options: AgriServiceUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AgriculturePlatform/agriServices/{agriServiceResourceName}{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agriServiceResourceName: agriServiceResourceName,
      "api-version": context.apiVersion,
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
    body: agriServiceResourceUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<AgriServiceResource> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return agriServiceResourceDeserializer(result.body);
}

/** Update a AgriServiceResource */
export function update(
  context: Client,
  resourceGroupName: string,
  agriServiceResourceName: string,
  properties: AgriServiceResourceUpdate,
  options: AgriServiceUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AgriServiceResource>, AgriServiceResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, agriServiceResourceName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<AgriServiceResource>, AgriServiceResource>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  agriServiceResourceName: string,
  resource: AgriServiceResource,
  options: AgriServiceCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AgriculturePlatform/agriServices/{agriServiceResourceName}{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agriServiceResourceName: agriServiceResourceName,
      "api-version": context.apiVersion,
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
    body: agriServiceResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AgriServiceResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return agriServiceResourceDeserializer(result.body);
}

/** Create a AgriServiceResource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  agriServiceResourceName: string,
  resource: AgriServiceResource,
  options: AgriServiceCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AgriServiceResource>, AgriServiceResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, agriServiceResourceName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<AgriServiceResource>, AgriServiceResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  agriServiceResourceName: string,
  options: AgriServiceGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AgriculturePlatform/agriServices/{agriServiceResourceName}{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agriServiceResourceName: agriServiceResourceName,
      "api-version": context.apiVersion,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AgriServiceResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return agriServiceResourceDeserializer(result.body);
}

/** Get a AgriServiceResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  agriServiceResourceName: string,
  options: AgriServiceGetOptionalParams = { requestOptions: {} },
): Promise<AgriServiceResource> {
  const result = await _getSend(context, resourceGroupName, agriServiceResourceName, options);
  return _getDeserialize(result);
}
