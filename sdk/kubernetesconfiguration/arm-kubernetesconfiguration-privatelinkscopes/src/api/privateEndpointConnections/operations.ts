// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PrivateLinkScopesContext as Client } from "../index.js";
import type {
  PrivateEndpointConnection,
  PrivateEndpointConnectionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  privateEndpointConnectionSerializer,
  privateEndpointConnectionDeserializer,
  privateEndpointConnectionListResultDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PrivateEndpointConnectionsListByPrivateLinkScopeOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByPrivateLinkScopeSend(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  options: PrivateEndpointConnectionsListByPrivateLinkScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KubernetesConfiguration/privateLinkScopes/{scopeName}/privateEndpointConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scopeName: scopeName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01-preview",
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

export async function _listByPrivateLinkScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateEndpointConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return privateEndpointConnectionListResultDeserializer(result.body);
}

/** Gets all private endpoint connections on a private link scope. */
export async function listByPrivateLinkScope(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  options: PrivateEndpointConnectionsListByPrivateLinkScopeOptionalParams = { requestOptions: {} },
): Promise<PrivateEndpointConnectionListResult> {
  const result = await _listByPrivateLinkScopeSend(context, resourceGroupName, scopeName, options);
  return _listByPrivateLinkScopeDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KubernetesConfiguration/privateLinkScopes/{scopeName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scopeName: scopeName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a private endpoint connection with a given name. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    scopeName,
    privateEndpointConnectionName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  privateEndpointConnectionName: string,
  properties: PrivateEndpointConnection,
  options: PrivateEndpointConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KubernetesConfiguration/privateLinkScopes/{scopeName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scopeName: scopeName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: privateEndpointConnectionSerializer(properties),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateEndpointConnection> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return privateEndpointConnectionDeserializer(result.body);
}

/** Approve or reject a private endpoint connection with a given name. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  privateEndpointConnectionName: string,
  properties: PrivateEndpointConnection,
  options: PrivateEndpointConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        scopeName,
        privateEndpointConnectionName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-11-01-preview",
  }) as PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KubernetesConfiguration/privateLinkScopes/{scopeName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scopeName: scopeName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01-preview",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return privateEndpointConnectionDeserializer(result.body);
}

/** Gets a private endpoint connection. */
export async function get(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<PrivateEndpointConnection> {
  const result = await _getSend(
    context,
    resourceGroupName,
    scopeName,
    privateEndpointConnectionName,
    options,
  );
  return _getDeserialize(result);
}
