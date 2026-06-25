// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SignalRManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  PrivateEndpointConnection,
  privateEndpointConnectionSerializer,
  privateEndpointConnectionDeserializer,
  _PrivateEndpointConnectionList,
  _privateEndpointConnectionListDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SignalRPrivateEndpointConnectionsListOptionalParams,
  SignalRPrivateEndpointConnectionsDeleteOptionalParams,
  SignalRPrivateEndpointConnectionsUpdateOptionalParams,
  SignalRPrivateEndpointConnectionsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: SignalRPrivateEndpointConnectionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/privateEndpointConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_PrivateEndpointConnectionList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _privateEndpointConnectionListDeserializer(result.body);
}

/** List private endpoint connections */
export function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: SignalRPrivateEndpointConnectionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateEndpointConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, resourceName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-01-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  privateEndpointConnectionName: string,
  resourceGroupName: string,
  resourceName: string,
  options: SignalRPrivateEndpointConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete the specified private endpoint connection */
export function $delete(
  context: Client,
  privateEndpointConnectionName: string,
  resourceGroupName: string,
  resourceName: string,
  options: SignalRPrivateEndpointConnectionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        privateEndpointConnectionName,
        resourceGroupName,
        resourceName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-01-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  privateEndpointConnectionName: string,
  resourceGroupName: string,
  resourceName: string,
  parameters: PrivateEndpointConnection,
  options: SignalRPrivateEndpointConnectionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: privateEndpointConnectionSerializer(parameters),
    });
}

export async function _updateDeserialize(
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

/** Update the state of specified private endpoint connection */
export async function update(
  context: Client,
  privateEndpointConnectionName: string,
  resourceGroupName: string,
  resourceName: string,
  parameters: PrivateEndpointConnection,
  options: SignalRPrivateEndpointConnectionsUpdateOptionalParams = { requestOptions: {} },
): Promise<PrivateEndpointConnection> {
  const result = await _updateSend(
    context,
    privateEndpointConnectionName,
    resourceGroupName,
    resourceName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _getSend(
  context: Client,
  privateEndpointConnectionName: string,
  resourceGroupName: string,
  resourceName: string,
  options: SignalRPrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
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

/** Get the specified private endpoint connection */
export async function get(
  context: Client,
  privateEndpointConnectionName: string,
  resourceGroupName: string,
  resourceName: string,
  options: SignalRPrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<PrivateEndpointConnection> {
  const result = await _getSend(
    context,
    privateEndpointConnectionName,
    resourceGroupName,
    resourceName,
    options,
  );
  return _getDeserialize(result);
}
