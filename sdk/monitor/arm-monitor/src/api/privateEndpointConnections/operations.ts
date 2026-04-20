// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type { MicrosoftPrivateLinkScopesPrivateEndpointConnection } from "../../models/microsoft/privateLinkScopes/models.js";
import {
  microsoftPrivateLinkScopesPrivateEndpointConnectionSerializer,
  microsoftPrivateLinkScopesPrivateEndpointConnectionDeserializer,
} from "../../models/microsoft/privateLinkScopes/models.js";
import type {
  PrivateEndpointConnection,
  _PrivateEndpointConnectionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _privateEndpointConnectionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
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
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/privateLinkScopes/{scopeName}/privateEndpointConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scopeName: scopeName,
      "api%2Dversion": "2023-06-01-preview",
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
): Promise<_PrivateEndpointConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _privateEndpointConnectionListResultDeserializer(result.body);
}

/** Gets all private endpoint connections on a private link scope. */
export function listByPrivateLinkScope(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  options: PrivateEndpointConnectionsListByPrivateLinkScopeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateEndpointConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listByPrivateLinkScopeSend(context, resourceGroupName, scopeName, options),
    _listByPrivateLinkScopeDeserialize,
    ["200"],
    { itemName: "value", apiVersion: "2023-06-01-preview" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/privateLinkScopes/{scopeName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scopeName: scopeName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": "2023-06-01-preview",
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
export function $delete(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, scopeName, privateEndpointConnectionName, options),
    resourceLocationConfig: "location",
    apiVersion: "2023-06-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  privateEndpointConnectionName: string,
  parameters: MicrosoftPrivateLinkScopesPrivateEndpointConnection,
  options: PrivateEndpointConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/privateLinkScopes/{scopeName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scopeName: scopeName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": "2023-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: microsoftPrivateLinkScopesPrivateEndpointConnectionSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<MicrosoftPrivateLinkScopesPrivateEndpointConnection> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return microsoftPrivateLinkScopesPrivateEndpointConnectionDeserializer(result.body);
}

/** Approve or reject a private endpoint connection with a given name. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  privateEndpointConnectionName: string,
  parameters: MicrosoftPrivateLinkScopesPrivateEndpointConnection,
  options: PrivateEndpointConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<MicrosoftPrivateLinkScopesPrivateEndpointConnection>,
  MicrosoftPrivateLinkScopesPrivateEndpointConnection
> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        scopeName,
        privateEndpointConnectionName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2023-06-01-preview",
  }) as PollerLike<
    OperationState<MicrosoftPrivateLinkScopesPrivateEndpointConnection>,
    MicrosoftPrivateLinkScopesPrivateEndpointConnection
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/privateLinkScopes/{scopeName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scopeName: scopeName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": "2023-06-01-preview",
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
): Promise<MicrosoftPrivateLinkScopesPrivateEndpointConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return microsoftPrivateLinkScopesPrivateEndpointConnectionDeserializer(result.body);
}

/** Gets a private endpoint connection. */
export async function get(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<MicrosoftPrivateLinkScopesPrivateEndpointConnection> {
  const result = await _getSend(
    context,
    resourceGroupName,
    scopeName,
    privateEndpointConnectionName,
    options,
  );
  return _getDeserialize(result);
}
