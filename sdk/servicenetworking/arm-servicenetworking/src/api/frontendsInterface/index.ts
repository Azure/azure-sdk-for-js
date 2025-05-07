// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ServiceNetworkingManagementContext as Client,
  FrontendsInterfaceCreateOrUpdateOptionalParams,
  FrontendsInterfaceDeleteOptionalParams,
  FrontendsInterfaceGetOptionalParams,
  FrontendsInterfaceListByTrafficControllerOptionalParams,
  FrontendsInterfaceUpdateOptionalParams,
} from "../index.js";
import {
  errorResponseDeserializer,
  Frontend,
  frontendSerializer,
  frontendDeserializer,
  FrontendUpdate,
  frontendUpdateSerializer,
  _FrontendListResult,
  _frontendListResultDeserializer,
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

export function _frontendsInterfaceListByTrafficControllerSend(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  options: FrontendsInterfaceListByTrafficControllerOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/frontends",
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

export async function _frontendsInterfaceListByTrafficControllerDeserialize(
  result: PathUncheckedResponse,
): Promise<_FrontendListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _frontendListResultDeserializer(result.body);
}

/** List Frontend resources by TrafficController */
export function frontendsInterfaceListByTrafficController(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  options: FrontendsInterfaceListByTrafficControllerOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<Frontend> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _frontendsInterfaceListByTrafficControllerSend(
        context,
        resourceGroupName,
        trafficControllerName,
        options,
      ),
    _frontendsInterfaceListByTrafficControllerDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _frontendsInterfaceDeleteSend(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  frontendName: string,
  options: FrontendsInterfaceDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/frontends/{frontendName}",
      context.subscriptionId,
      resourceGroupName,
      trafficControllerName,
      frontendName,
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

export async function _frontendsInterfaceDeleteDeserialize(
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

/** Delete a Frontend */
export function frontendsInterfaceDelete(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  frontendName: string,
  options: FrontendsInterfaceDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _frontendsInterfaceDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _frontendsInterfaceDeleteSend(
          context,
          resourceGroupName,
          trafficControllerName,
          frontendName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _frontendsInterfaceUpdateSend(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  frontendName: string,
  properties: FrontendUpdate,
  options: FrontendsInterfaceUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/frontends/{frontendName}",
      context.subscriptionId,
      resourceGroupName,
      trafficControllerName,
      frontendName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: frontendUpdateSerializer(properties),
    });
}

export async function _frontendsInterfaceUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Frontend> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return frontendDeserializer(result.body);
}

/** Update a Frontend */
export async function frontendsInterfaceUpdate(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  frontendName: string,
  properties: FrontendUpdate,
  options: FrontendsInterfaceUpdateOptionalParams = { requestOptions: {} },
): Promise<Frontend> {
  const result = await _frontendsInterfaceUpdateSend(
    context,
    resourceGroupName,
    trafficControllerName,
    frontendName,
    properties,
    options,
  );
  return _frontendsInterfaceUpdateDeserialize(result);
}

export function _frontendsInterfaceCreateOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  frontendName: string,
  resource: Frontend,
  options: FrontendsInterfaceCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/frontends/{frontendName}",
      context.subscriptionId,
      resourceGroupName,
      trafficControllerName,
      frontendName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: frontendSerializer(resource),
    });
}

export async function _frontendsInterfaceCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Frontend> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return frontendDeserializer(result.body);
}

/** Create a Frontend */
export function frontendsInterfaceCreateOrUpdate(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  frontendName: string,
  resource: Frontend,
  options: FrontendsInterfaceCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<Frontend>, Frontend> {
  return getLongRunningPoller(
    context,
    _frontendsInterfaceCreateOrUpdateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _frontendsInterfaceCreateOrUpdateSend(
          context,
          resourceGroupName,
          trafficControllerName,
          frontendName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<Frontend>, Frontend>;
}

export function _frontendsInterfaceGetSend(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  frontendName: string,
  options: FrontendsInterfaceGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/frontends/{frontendName}",
      context.subscriptionId,
      resourceGroupName,
      trafficControllerName,
      frontendName,
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

export async function _frontendsInterfaceGetDeserialize(
  result: PathUncheckedResponse,
): Promise<Frontend> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return frontendDeserializer(result.body);
}

/** Get a Frontend */
export async function frontendsInterfaceGet(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  frontendName: string,
  options: FrontendsInterfaceGetOptionalParams = { requestOptions: {} },
): Promise<Frontend> {
  const result = await _frontendsInterfaceGetSend(
    context,
    resourceGroupName,
    trafficControllerName,
    frontendName,
    options,
  );
  return _frontendsInterfaceGetDeserialize(result);
}
