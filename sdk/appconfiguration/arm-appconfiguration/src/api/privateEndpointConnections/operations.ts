// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppConfigurationManagementContext as Client } from "../index.js";
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
  PrivateEndpointConnectionsListByConfigurationStoreOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByConfigurationStoreSend(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  options: PrivateEndpointConnectionsListByConfigurationStoreOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/privateEndpointConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configStoreName: configStoreName,
      "api%2Dversion": context.apiVersion,
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

export async function _listByConfigurationStoreDeserialize(
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

/** Lists all private endpoint connections for a configuration store. */
export function listByConfigurationStore(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  options: PrivateEndpointConnectionsListByConfigurationStoreOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PrivateEndpointConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listByConfigurationStoreSend(context, resourceGroupName, configStoreName, options),
    _listByConfigurationStoreDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configStoreName: configStoreName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a private endpoint connection. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        configStoreName,
        privateEndpointConnectionName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  privateEndpointConnectionName: string,
  privateEndpointConnection: PrivateEndpointConnection,
  options: PrivateEndpointConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configStoreName: configStoreName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: privateEndpointConnectionSerializer(privateEndpointConnection),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateEndpointConnection> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return privateEndpointConnectionDeserializer(result.body);
}

/** Update the state of the specified private endpoint connection associated with the configuration store. This operation cannot be used to create a private endpoint connection. Private endpoint connections must be created with the Network resource provider. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  privateEndpointConnectionName: string,
  privateEndpointConnection: PrivateEndpointConnection,
  options: PrivateEndpointConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        configStoreName,
        privateEndpointConnectionName,
        privateEndpointConnection,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configStoreName: configStoreName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion,
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

/** Gets the specified private endpoint connection associated with the configuration store. */
export async function get(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<PrivateEndpointConnection> {
  const result = await _getSend(
    context,
    resourceGroupName,
    configStoreName,
    privateEndpointConnectionName,
    options,
  );
  return _getDeserialize(result);
}
