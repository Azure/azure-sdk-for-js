// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AgriServiceCreateOrUpdateOptionalParams,
  AgriServiceDeleteOptionalParams,
  AgriServiceGetOptionalParams,
  AgriServiceListAvailableSolutionsOptionalParams,
  AgriServiceListByResourceGroupOptionalParams,
  AgriServiceListBySubscriptionOptionalParams,
  AgriServiceUpdateOptionalParams,
  AgriculturePlatformContext as Client,
} from "../index.js";
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
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _agriServiceListAvailableSolutionsSend(
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

export async function _agriServiceListAvailableSolutionsDeserialize(
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
export async function agriServiceListAvailableSolutions(
  context: Client,
  resourceGroupName: string,
  agriServiceResourceName: string,
  options: AgriServiceListAvailableSolutionsOptionalParams = {
    requestOptions: {},
  },
): Promise<AvailableAgriSolutionListResult> {
  const result = await _agriServiceListAvailableSolutionsSend(
    context,
    resourceGroupName,
    agriServiceResourceName,
    options,
  );
  return _agriServiceListAvailableSolutionsDeserialize(result);
}

export function _agriServiceListBySubscriptionSend(
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

export async function _agriServiceListBySubscriptionDeserialize(
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
export function agriServiceListBySubscription(
  context: Client,
  options: AgriServiceListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AgriServiceResource> {
  return buildPagedAsyncIterator(
    context,
    () => _agriServiceListBySubscriptionSend(context, options),
    _agriServiceListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _agriServiceListByResourceGroupSend(
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

export async function _agriServiceListByResourceGroupDeserialize(
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
export function agriServiceListByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: AgriServiceListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AgriServiceResource> {
  return buildPagedAsyncIterator(
    context,
    () => _agriServiceListByResourceGroupSend(context, resourceGroupName, options),
    _agriServiceListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _agriServiceDeleteSend(
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

export async function _agriServiceDeleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a AgriServiceResource */
export function agriServiceDelete(
  context: Client,
  resourceGroupName: string,
  agriServiceResourceName: string,
  options: AgriServiceDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _agriServiceDeleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _agriServiceDeleteSend(context, resourceGroupName, agriServiceResourceName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _agriServiceUpdateSend(
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

export async function _agriServiceUpdateDeserialize(
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
export function agriServiceUpdate(
  context: Client,
  resourceGroupName: string,
  agriServiceResourceName: string,
  properties: AgriServiceResourceUpdate,
  options: AgriServiceUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AgriServiceResource>, AgriServiceResource> {
  return getLongRunningPoller(context, _agriServiceUpdateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _agriServiceUpdateSend(
        context,
        resourceGroupName,
        agriServiceResourceName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<AgriServiceResource>, AgriServiceResource>;
}

export function _agriServiceCreateOrUpdateSend(
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

export async function _agriServiceCreateOrUpdateDeserialize(
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
export function agriServiceCreateOrUpdate(
  context: Client,
  resourceGroupName: string,
  agriServiceResourceName: string,
  resource: AgriServiceResource,
  options: AgriServiceCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AgriServiceResource>, AgriServiceResource> {
  return getLongRunningPoller(context, _agriServiceCreateOrUpdateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _agriServiceCreateOrUpdateSend(
        context,
        resourceGroupName,
        agriServiceResourceName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<AgriServiceResource>, AgriServiceResource>;
}

export function _agriServiceGetSend(
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

export async function _agriServiceGetDeserialize(
  result: PathUncheckedResponse,
): Promise<AgriServiceResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return agriServiceResourceDeserializer(result.body);
}

/** Get a AgriServiceResource */
export async function agriServiceGet(
  context: Client,
  resourceGroupName: string,
  agriServiceResourceName: string,
  options: AgriServiceGetOptionalParams = { requestOptions: {} },
): Promise<AgriServiceResource> {
  const result = await _agriServiceGetSend(
    context,
    resourceGroupName,
    agriServiceResourceName,
    options,
  );
  return _agriServiceGetDeserialize(result);
}
