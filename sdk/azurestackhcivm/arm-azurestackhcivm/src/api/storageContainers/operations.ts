// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  StorageContainer,
  storageContainerSerializer,
  storageContainerDeserializer,
  StorageContainerTagsUpdate,
  storageContainerTagsUpdateSerializer,
  _StorageContainerListResult,
  _storageContainerListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StorageContainersListAllOptionalParams,
  StorageContainersListByResourceGroupOptionalParams,
  StorageContainersDeleteOptionalParams,
  StorageContainersUpdateOptionalParams,
  StorageContainersCreateOrUpdateOptionalParams,
  StorageContainersGetOptionalParams,
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
  options: StorageContainersListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AzureStackHCI/storageContainers{?api%2Dversion}",
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
): Promise<_StorageContainerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _storageContainerListResultDeserializer(result.body);
}

/** Lists all of the storage containers in the specified subscription. Use the nextLink property in the response to get the next page of storage containers. */
export function listAll(
  context: Client,
  options: StorageContainersListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StorageContainer> {
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
  options: StorageContainersListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/storageContainers{?api%2Dversion}",
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
): Promise<_StorageContainerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _storageContainerListResultDeserializer(result.body);
}

/** Lists all of the storage containers in the specified resource group. Use the nextLink property in the response to get the next page of storage containers. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: StorageContainersListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<StorageContainer> {
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
  storageContainerName: string,
  options: StorageContainersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/storageContainers/{storageContainerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageContainerName: storageContainerName,
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

/** The operation to delete a storage container. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  storageContainerName: string,
  options: StorageContainersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, storageContainerName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  storageContainerName: string,
  properties: StorageContainerTagsUpdate,
  options: StorageContainersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/storageContainers/{storageContainerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageContainerName: storageContainerName,
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
    body: storageContainerTagsUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<StorageContainer> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return storageContainerDeserializer(result.body);
}

/** The operation to update a storage container. */
export function update(
  context: Client,
  resourceGroupName: string,
  storageContainerName: string,
  properties: StorageContainerTagsUpdate,
  options: StorageContainersUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<StorageContainer>, StorageContainer> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, storageContainerName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<StorageContainer>, StorageContainer>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  storageContainerName: string,
  resource: StorageContainer,
  options: StorageContainersCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/storageContainers/{storageContainerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageContainerName: storageContainerName,
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
    body: storageContainerSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<StorageContainer> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return storageContainerDeserializer(result.body);
}

/** The operation to create or update a storage container. Please note some properties can be set only during storage container creation. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  storageContainerName: string,
  resource: StorageContainer,
  options: StorageContainersCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<StorageContainer>, StorageContainer> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, storageContainerName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<StorageContainer>, StorageContainer>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  storageContainerName: string,
  options: StorageContainersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/storageContainers/{storageContainerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageContainerName: storageContainerName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<StorageContainer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return storageContainerDeserializer(result.body);
}

/** Gets a storage container */
export async function get(
  context: Client,
  resourceGroupName: string,
  storageContainerName: string,
  options: StorageContainersGetOptionalParams = { requestOptions: {} },
): Promise<StorageContainer> {
  const result = await _getSend(context, resourceGroupName, storageContainerName, options);
  return _getDeserialize(result);
}
