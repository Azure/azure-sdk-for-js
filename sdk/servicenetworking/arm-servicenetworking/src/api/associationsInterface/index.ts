// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AssociationsInterfaceCreateOrUpdateOptionalParams,
  AssociationsInterfaceDeleteOptionalParams,
  AssociationsInterfaceGetOptionalParams,
  AssociationsInterfaceListByTrafficControllerOptionalParams,
  AssociationsInterfaceUpdateOptionalParams,
  ServiceNetworkingManagementContext as Client,
} from "../index.js";
import {
  errorResponseDeserializer,
  Association,
  associationSerializer,
  associationDeserializer,
  AssociationUpdate,
  associationUpdateSerializer,
  _AssociationListResult,
  _associationListResultDeserializer,
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

export function _associationsInterfaceListByTrafficControllerSend(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  options: AssociationsInterfaceListByTrafficControllerOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/associations",
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

export async function _associationsInterfaceListByTrafficControllerDeserialize(
  result: PathUncheckedResponse,
): Promise<_AssociationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _associationListResultDeserializer(result.body);
}

/** List Association resources by TrafficController */
export function associationsInterfaceListByTrafficController(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  options: AssociationsInterfaceListByTrafficControllerOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<Association> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _associationsInterfaceListByTrafficControllerSend(
        context,
        resourceGroupName,
        trafficControllerName,
        options,
      ),
    _associationsInterfaceListByTrafficControllerDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _associationsInterfaceDeleteSend(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  associationName: string,
  options: AssociationsInterfaceDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/associations/{associationName}",
      context.subscriptionId,
      resourceGroupName,
      trafficControllerName,
      associationName,
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

export async function _associationsInterfaceDeleteDeserialize(
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

/** Delete a Association */
export function associationsInterfaceDelete(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  associationName: string,
  options: AssociationsInterfaceDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _associationsInterfaceDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _associationsInterfaceDeleteSend(
          context,
          resourceGroupName,
          trafficControllerName,
          associationName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _associationsInterfaceUpdateSend(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  associationName: string,
  properties: AssociationUpdate,
  options: AssociationsInterfaceUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/associations/{associationName}",
      context.subscriptionId,
      resourceGroupName,
      trafficControllerName,
      associationName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: associationUpdateSerializer(properties),
    });
}

export async function _associationsInterfaceUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Association> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return associationDeserializer(result.body);
}

/** Update a Association */
export async function associationsInterfaceUpdate(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  associationName: string,
  properties: AssociationUpdate,
  options: AssociationsInterfaceUpdateOptionalParams = { requestOptions: {} },
): Promise<Association> {
  const result = await _associationsInterfaceUpdateSend(
    context,
    resourceGroupName,
    trafficControllerName,
    associationName,
    properties,
    options,
  );
  return _associationsInterfaceUpdateDeserialize(result);
}

export function _associationsInterfaceCreateOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  associationName: string,
  resource: Association,
  options: AssociationsInterfaceCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/associations/{associationName}",
      context.subscriptionId,
      resourceGroupName,
      trafficControllerName,
      associationName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: associationSerializer(resource),
    });
}

export async function _associationsInterfaceCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Association> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return associationDeserializer(result.body);
}

/** Create a Association */
export function associationsInterfaceCreateOrUpdate(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  associationName: string,
  resource: Association,
  options: AssociationsInterfaceCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<Association>, Association> {
  return getLongRunningPoller(
    context,
    _associationsInterfaceCreateOrUpdateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _associationsInterfaceCreateOrUpdateSend(
          context,
          resourceGroupName,
          trafficControllerName,
          associationName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<Association>, Association>;
}

export function _associationsInterfaceGetSend(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  associationName: string,
  options: AssociationsInterfaceGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/associations/{associationName}",
      context.subscriptionId,
      resourceGroupName,
      trafficControllerName,
      associationName,
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

export async function _associationsInterfaceGetDeserialize(
  result: PathUncheckedResponse,
): Promise<Association> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return associationDeserializer(result.body);
}

/** Get a Association */
export async function associationsInterfaceGet(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  associationName: string,
  options: AssociationsInterfaceGetOptionalParams = { requestOptions: {} },
): Promise<Association> {
  const result = await _associationsInterfaceGetSend(
    context,
    resourceGroupName,
    trafficControllerName,
    associationName,
    options,
  );
  return _associationsInterfaceGetDeserialize(result);
}
