// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ServiceNetworkingManagementContext as Client,
  TrafficControllerInterfaceCreateOrUpdateOptionalParams,
  TrafficControllerInterfaceDeleteOptionalParams,
  TrafficControllerInterfaceGetOptionalParams,
  TrafficControllerInterfaceListByResourceGroupOptionalParams,
  TrafficControllerInterfaceListBySubscriptionOptionalParams,
  TrafficControllerInterfaceUpdateOptionalParams,
} from "../index.js";
import {
  errorResponseDeserializer,
  TrafficController,
  trafficControllerSerializer,
  trafficControllerDeserializer,
  TrafficControllerUpdate,
  trafficControllerUpdateSerializer,
  _TrafficControllerListResult,
  _trafficControllerListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _trafficControllerInterfaceListBySubscriptionSend(
  context: Client,
  options: TrafficControllerInterfaceListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceNetworking/trafficControllers",
      context.subscriptionId,
    )
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _trafficControllerInterfaceListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_TrafficControllerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _trafficControllerListResultDeserializer(result.body);
}

/** List TrafficController resources by subscription ID */
export function trafficControllerInterfaceListBySubscription(
  context: Client,
  options: TrafficControllerInterfaceListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<TrafficController> {
  return buildPagedAsyncIterator(
    context,
    () => _trafficControllerInterfaceListBySubscriptionSend(context, options),
    _trafficControllerInterfaceListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _trafficControllerInterfaceListByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: TrafficControllerInterfaceListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers",
      context.subscriptionId,
      resourceGroupName,
    )
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _trafficControllerInterfaceListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_TrafficControllerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _trafficControllerListResultDeserializer(result.body);
}

/** List TrafficController resources by resource group */
export function trafficControllerInterfaceListByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: TrafficControllerInterfaceListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<TrafficController> {
  return buildPagedAsyncIterator(
    context,
    () => _trafficControllerInterfaceListByResourceGroupSend(context, resourceGroupName, options),
    _trafficControllerInterfaceListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _trafficControllerInterfaceDeleteSend(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  options: TrafficControllerInterfaceDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}",
      context.subscriptionId,
      resourceGroupName,
      trafficControllerName,
    )
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _trafficControllerInterfaceDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a TrafficController */
export function trafficControllerInterfaceDelete(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  options: TrafficControllerInterfaceDeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _trafficControllerInterfaceDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _trafficControllerInterfaceDeleteSend(
          context,
          resourceGroupName,
          trafficControllerName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _trafficControllerInterfaceUpdateSend(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  properties: TrafficControllerUpdate,
  options: TrafficControllerInterfaceUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}",
      context.subscriptionId,
      resourceGroupName,
      trafficControllerName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: trafficControllerUpdateSerializer(properties),
    });
}

export async function _trafficControllerInterfaceUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<TrafficController> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return trafficControllerDeserializer(result.body);
}

/** Update a TrafficController */
export async function trafficControllerInterfaceUpdate(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  properties: TrafficControllerUpdate,
  options: TrafficControllerInterfaceUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<TrafficController> {
  const result = await _trafficControllerInterfaceUpdateSend(
    context,
    resourceGroupName,
    trafficControllerName,
    properties,
    options,
  );
  return _trafficControllerInterfaceUpdateDeserialize(result);
}

export function _trafficControllerInterfaceCreateOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  resource: TrafficController,
  options: TrafficControllerInterfaceCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}",
      context.subscriptionId,
      resourceGroupName,
      trafficControllerName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: trafficControllerSerializer(resource),
    });
}

export async function _trafficControllerInterfaceCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<TrafficController> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return trafficControllerDeserializer(result.body);
}

/** Create a TrafficController */
export function trafficControllerInterfaceCreateOrUpdate(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  resource: TrafficController,
  options: TrafficControllerInterfaceCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<TrafficController>, TrafficController> {
  return getLongRunningPoller(
    context,
    _trafficControllerInterfaceCreateOrUpdateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _trafficControllerInterfaceCreateOrUpdateSend(
          context,
          resourceGroupName,
          trafficControllerName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<TrafficController>, TrafficController>;
}

export function _trafficControllerInterfaceGetSend(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  options: TrafficControllerInterfaceGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}",
      context.subscriptionId,
      resourceGroupName,
      trafficControllerName,
    )
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _trafficControllerInterfaceGetDeserialize(
  result: PathUncheckedResponse,
): Promise<TrafficController> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return trafficControllerDeserializer(result.body);
}

/** Get a TrafficController */
export async function trafficControllerInterfaceGet(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  options: TrafficControllerInterfaceGetOptionalParams = { requestOptions: {} },
): Promise<TrafficController> {
  const result = await _trafficControllerInterfaceGetSend(
    context,
    resourceGroupName,
    trafficControllerName,
    options,
  );
  return _trafficControllerInterfaceGetDeserialize(result);
}
