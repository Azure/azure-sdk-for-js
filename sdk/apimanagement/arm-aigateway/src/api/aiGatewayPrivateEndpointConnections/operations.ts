// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  AiGatewayPrivateEndpointConnection,
  _AiGatewayPrivateEndpointConnectionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  aiGatewayPrivateEndpointConnectionSerializer,
  aiGatewayPrivateEndpointConnectionDeserializer,
  _aiGatewayPrivateEndpointConnectionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AiGatewayPrivateEndpointConnectionsListByAiGatewayOptionalParams,
  AiGatewayPrivateEndpointConnectionsDeleteOptionalParams,
  AiGatewayPrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  AiGatewayPrivateEndpointConnectionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByAiGatewaySend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  options: AiGatewayPrivateEndpointConnectionsListByAiGatewayOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/privateEndpointConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
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

export async function _listByAiGatewayDeserialize(
  result: PathUncheckedResponse,
): Promise<_AiGatewayPrivateEndpointConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _aiGatewayPrivateEndpointConnectionListResultDeserializer(result.body);
}

/** List AiGatewayResource PrivateEndpointConnections */
export function listByAiGateway(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  options: AiGatewayPrivateEndpointConnectionsListByAiGatewayOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AiGatewayPrivateEndpointConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listByAiGatewaySend(context, resourceGroupName, aiGatewayName, options),
    _listByAiGatewayDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-11-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  privateEndpointConnectionName: string,
  options: AiGatewayPrivateEndpointConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
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

/** Deletes a private endpoint connection. Until the connection is removed, `properties.provisioningState` is `Deleting`. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  privateEndpointConnectionName: string,
  options: AiGatewayPrivateEndpointConnectionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        aiGatewayName,
        privateEndpointConnectionName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-11-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  privateEndpointConnectionName: string,
  resource: AiGatewayPrivateEndpointConnection,
  options: AiGatewayPrivateEndpointConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: aiGatewayPrivateEndpointConnectionSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AiGatewayPrivateEndpointConnection> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return aiGatewayPrivateEndpointConnectionDeserializer(result.body);
}

/** Approves or rejects a private endpoint connection. While the decision is applied, `properties.provisioningState` is `Updating`, a service-defined value of the extensible provisioning state. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  privateEndpointConnectionName: string,
  resource: AiGatewayPrivateEndpointConnection,
  options: AiGatewayPrivateEndpointConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<AiGatewayPrivateEndpointConnection>,
  AiGatewayPrivateEndpointConnection
> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        aiGatewayName,
        privateEndpointConnectionName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-11-01",
  }) as PollerLike<
    OperationState<AiGatewayPrivateEndpointConnection>,
    AiGatewayPrivateEndpointConnection
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  privateEndpointConnectionName: string,
  options: AiGatewayPrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
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
): Promise<AiGatewayPrivateEndpointConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return aiGatewayPrivateEndpointConnectionDeserializer(result.body);
}

/** Get a AiGatewayResource PrivateEndpointConnection */
export async function get(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  privateEndpointConnectionName: string,
  options: AiGatewayPrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<AiGatewayPrivateEndpointConnection> {
  const result = await _getSend(
    context,
    resourceGroupName,
    aiGatewayName,
    privateEndpointConnectionName,
    options,
  );
  return _getDeserialize(result);
}
