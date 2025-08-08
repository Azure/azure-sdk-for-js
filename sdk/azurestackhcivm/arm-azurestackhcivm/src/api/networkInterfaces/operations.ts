// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  NetworkInterface,
  networkInterfaceSerializer,
  networkInterfaceDeserializer,
  NetworkInterfacesUpdateRequest,
  networkInterfacesUpdateRequestSerializer,
  _NetworkInterfaceListResult,
  _networkInterfaceListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  NetworkInterfacesListAllOptionalParams,
  NetworkInterfacesListByResourceGroupOptionalParams,
  NetworkInterfacesDeleteOptionalParams,
  NetworkInterfacesUpdateOptionalParams,
  NetworkInterfacesCreateOrUpdateOptionalParams,
  NetworkInterfacesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listAllSend(
  context: Client,
  options: NetworkInterfacesListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AzureStackHCI/networkInterfaces{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
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

export async function _listAllDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkInterfaceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _networkInterfaceListResultDeserializer(result.body);
}

/** Lists all of the network interfaces in the specified subscription. Use the nextLink property in the response to get the next page of network interfaces. */
export function listAll(
  context: Client,
  options: NetworkInterfacesListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NetworkInterface> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllSend(context, options),
    _listAllDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: NetworkInterfacesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/networkInterfaces{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkInterfaceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _networkInterfaceListResultDeserializer(result.body);
}

/** Lists all of the network interfaces in the specified resource group. Use the nextLink property in the response to get the next page of network interfaces. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: NetworkInterfacesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<NetworkInterface> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  options: NetworkInterfacesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/networkInterfaces/{networkInterfaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkInterfaceName: networkInterfaceName,
      "api%2Dversion": context.apiVersion,
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

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** The operation to delete a network interface. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  options: NetworkInterfacesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, networkInterfaceName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  properties: NetworkInterfacesUpdateRequest,
  options: NetworkInterfacesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/networkInterfaces/{networkInterfaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkInterfaceName: networkInterfaceName,
      "api%2Dversion": context.apiVersion,
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
    body: networkInterfacesUpdateRequestSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<NetworkInterface> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return networkInterfaceDeserializer(result.body);
}

/** The operation to update a network interface. */
export function update(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  properties: NetworkInterfacesUpdateRequest,
  options: NetworkInterfacesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NetworkInterface>, NetworkInterface> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, networkInterfaceName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<NetworkInterface>, NetworkInterface>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  resource: NetworkInterface,
  options: NetworkInterfacesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/networkInterfaces/{networkInterfaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkInterfaceName: networkInterfaceName,
      "api%2Dversion": context.apiVersion,
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
    body: networkInterfaceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkInterface> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return networkInterfaceDeserializer(result.body);
}

/** The operation to create or update a network interface. Please note some properties can be set only during network interface creation. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  resource: NetworkInterface,
  options: NetworkInterfacesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<NetworkInterface>, NetworkInterface> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, networkInterfaceName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<NetworkInterface>, NetworkInterface>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  options: NetworkInterfacesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/networkInterfaces/{networkInterfaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkInterfaceName: networkInterfaceName,
      "api%2Dversion": context.apiVersion,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<NetworkInterface> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return networkInterfaceDeserializer(result.body);
}

/** Gets a network interface */
export async function get(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  options: NetworkInterfacesGetOptionalParams = { requestOptions: {} },
): Promise<NetworkInterface> {
  const result = await _getSend(context, resourceGroupName, networkInterfaceName, options);
  return _getDeserialize(result);
}
