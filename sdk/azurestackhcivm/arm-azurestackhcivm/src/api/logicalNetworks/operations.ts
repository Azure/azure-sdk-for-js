// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  LogicalNetwork,
  logicalNetworkSerializer,
  logicalNetworkDeserializer,
  LogicalNetworksUpdateRequest,
  logicalNetworksUpdateRequestSerializer,
  _LogicalNetworkListResult,
  _logicalNetworkListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  LogicalNetworksListAllOptionalParams,
  LogicalNetworksListByResourceGroupOptionalParams,
  LogicalNetworksDeleteOptionalParams,
  LogicalNetworksUpdateOptionalParams,
  LogicalNetworksCreateOrUpdateOptionalParams,
  LogicalNetworksGetOptionalParams,
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
  options: LogicalNetworksListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AzureStackHCI/logicalNetworks{?api%2Dversion}",
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
): Promise<_LogicalNetworkListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _logicalNetworkListResultDeserializer(result.body);
}

/** Lists all of the logical networks in the specified subscription. Use the nextLink property in the response to get the next page of logical networks. */
export function listAll(
  context: Client,
  options: LogicalNetworksListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LogicalNetwork> {
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
  options: LogicalNetworksListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/logicalNetworks{?api%2Dversion}",
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
): Promise<_LogicalNetworkListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _logicalNetworkListResultDeserializer(result.body);
}

/** Lists all of the logical networks in the specified resource group. Use the nextLink property in the response to get the next page of logical networks. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: LogicalNetworksListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<LogicalNetwork> {
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
  logicalNetworkName: string,
  options: LogicalNetworksDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/logicalNetworks/{logicalNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      logicalNetworkName: logicalNetworkName,
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

/** The operation to delete a logical network. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  logicalNetworkName: string,
  options: LogicalNetworksDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, logicalNetworkName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  logicalNetworkName: string,
  properties: LogicalNetworksUpdateRequest,
  options: LogicalNetworksUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/logicalNetworks/{logicalNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      logicalNetworkName: logicalNetworkName,
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
    body: logicalNetworksUpdateRequestSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<LogicalNetwork> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return logicalNetworkDeserializer(result.body);
}

/** The operation to update a logical network. */
export function update(
  context: Client,
  resourceGroupName: string,
  logicalNetworkName: string,
  properties: LogicalNetworksUpdateRequest,
  options: LogicalNetworksUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<LogicalNetwork>, LogicalNetwork> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, logicalNetworkName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<LogicalNetwork>, LogicalNetwork>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  logicalNetworkName: string,
  resource: LogicalNetwork,
  options: LogicalNetworksCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/logicalNetworks/{logicalNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      logicalNetworkName: logicalNetworkName,
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
    body: logicalNetworkSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<LogicalNetwork> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return logicalNetworkDeserializer(result.body);
}

/** The operation to create or update a logical network. Please note some properties can be set only during logical network creation. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  logicalNetworkName: string,
  resource: LogicalNetwork,
  options: LogicalNetworksCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<LogicalNetwork>, LogicalNetwork> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, logicalNetworkName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<LogicalNetwork>, LogicalNetwork>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  logicalNetworkName: string,
  options: LogicalNetworksGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/logicalNetworks/{logicalNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      logicalNetworkName: logicalNetworkName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<LogicalNetwork> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return logicalNetworkDeserializer(result.body);
}

/** The operation to get a logical network. */
export async function get(
  context: Client,
  resourceGroupName: string,
  logicalNetworkName: string,
  options: LogicalNetworksGetOptionalParams = { requestOptions: {} },
): Promise<LogicalNetwork> {
  const result = await _getSend(context, resourceGroupName, logicalNetworkName, options);
  return _getDeserialize(result);
}
