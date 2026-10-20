// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceNetworkingManagementContext as Client } from "../index.js";
import type {
  PrivateEndpointConnection,
  _PrivateEndpointConnectionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  privateEndpointConnectionSerializer,
  privateEndpointConnectionDeserializer,
  _privateEndpointConnectionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PrivateEndpointConnectionsInterfaceListByTrafficControllerOptionalParams,
  PrivateEndpointConnectionsInterfaceDeleteOptionalParams,
  PrivateEndpointConnectionsInterfaceUpdateOptionalParams,
  PrivateEndpointConnectionsInterfaceGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByTrafficControllerSend(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  options: PrivateEndpointConnectionsInterfaceListByTrafficControllerOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/privateEndpointConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      trafficControllerName: trafficControllerName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByTrafficControllerDeserialize(
  result: PathUncheckedResponse,
): Promise<_PrivateEndpointConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _privateEndpointConnectionListResultDeserializer(result.body);
}

/** List PrivateEndpointConnection resources by TrafficController */
export function listByTrafficController(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  options: PrivateEndpointConnectionsInterfaceListByTrafficControllerOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PrivateEndpointConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listByTrafficControllerSend(context, resourceGroupName, trafficControllerName, options),
    _listByTrafficControllerDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-03-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsInterfaceDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      trafficControllerName: trafficControllerName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a PrivateEndpointConnection */
export function $delete(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsInterfaceDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        trafficControllerName,
        privateEndpointConnectionName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  privateEndpointConnectionName: string,
  resource: PrivateEndpointConnection,
  options: PrivateEndpointConnectionsInterfaceUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      trafficControllerName: trafficControllerName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: privateEndpointConnectionSerializer(resource),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateEndpointConnection> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return privateEndpointConnectionDeserializer(result.body);
}

/** Create a PrivateEndpointConnection */
export function update(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  privateEndpointConnectionName: string,
  resource: PrivateEndpointConnection,
  options: PrivateEndpointConnectionsInterfaceUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        trafficControllerName,
        privateEndpointConnectionName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-03-01",
  }) as PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsInterfaceGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      trafficControllerName: trafficControllerName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateEndpointConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return privateEndpointConnectionDeserializer(result.body);
}

/** Get a PrivateEndpointConnection */
export async function get(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsInterfaceGetOptionalParams = { requestOptions: {} },
): Promise<PrivateEndpointConnection> {
  const result = await _getSend(
    context,
    resourceGroupName,
    trafficControllerName,
    privateEndpointConnectionName,
    options,
  );
  return _getDeserialize(result);
}
