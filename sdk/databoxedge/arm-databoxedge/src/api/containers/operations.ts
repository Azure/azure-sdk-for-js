// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  Container,
  containerSerializer,
  containerDeserializer,
  _ContainerList,
  _containerListDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ContainersRefreshOptionalParams,
  ContainersListByStorageAccountOptionalParams,
  ContainersDeleteOptionalParams,
  ContainersCreateOrUpdateOptionalParams,
  ContainersGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _refreshSend(
  context: Client,
  deviceName: string,
  storageAccountName: string,
  containerName: string,
  resourceGroupName: string,
  options: ContainersRefreshOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/storageAccounts/{storageAccountName}/containers/{containerName}/refresh{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      storageAccountName: storageAccountName,
      containerName: containerName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _refreshDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Refreshes the container metadata with the data from the cloud. */
export function refresh(
  context: Client,
  deviceName: string,
  storageAccountName: string,
  containerName: string,
  resourceGroupName: string,
  options: ContainersRefreshOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _refreshDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _refreshSend(
        context,
        deviceName,
        storageAccountName,
        containerName,
        resourceGroupName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2023-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByStorageAccountSend(
  context: Client,
  deviceName: string,
  storageAccountName: string,
  resourceGroupName: string,
  options: ContainersListByStorageAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/storageAccounts/{storageAccountName}/containers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      storageAccountName: storageAccountName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
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

export async function _listByStorageAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_ContainerList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _containerListDeserializer(result.body);
}

/** Lists all the containers of a storage Account in a Data Box Edge/Data Box Gateway device. */
export function listByStorageAccount(
  context: Client,
  deviceName: string,
  storageAccountName: string,
  resourceGroupName: string,
  options: ContainersListByStorageAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Container> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByStorageAccountSend(
        context,
        deviceName,
        storageAccountName,
        resourceGroupName,
        options,
      ),
    _listByStorageAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2023-12-01" },
  );
}

export function _$deleteSend(
  context: Client,
  deviceName: string,
  storageAccountName: string,
  containerName: string,
  resourceGroupName: string,
  options: ContainersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/storageAccounts/{storageAccountName}/containers/{containerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      storageAccountName: storageAccountName,
      containerName: containerName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
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
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the container on the Data Box Edge/Data Box Gateway device. */
export function $delete(
  context: Client,
  deviceName: string,
  storageAccountName: string,
  containerName: string,
  resourceGroupName: string,
  options: ContainersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        deviceName,
        storageAccountName,
        containerName,
        resourceGroupName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2023-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  deviceName: string,
  storageAccountName: string,
  containerName: string,
  resourceGroupName: string,
  container: Container,
  options: ContainersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/storageAccounts/{storageAccountName}/containers/{containerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      storageAccountName: storageAccountName,
      containerName: containerName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
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
      body: containerSerializer(container),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Container> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return containerDeserializer(result.body);
}

/** Creates a new container or updates an existing container on the device. */
export function createOrUpdate(
  context: Client,
  deviceName: string,
  storageAccountName: string,
  containerName: string,
  resourceGroupName: string,
  container: Container,
  options: ContainersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Container>, Container> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        deviceName,
        storageAccountName,
        containerName,
        resourceGroupName,
        container,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2023-12-01",
  }) as PollerLike<OperationState<Container>, Container>;
}

export function _getSend(
  context: Client,
  deviceName: string,
  storageAccountName: string,
  containerName: string,
  resourceGroupName: string,
  options: ContainersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/storageAccounts/{storageAccountName}/containers/{containerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      storageAccountName: storageAccountName,
      containerName: containerName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Container> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return containerDeserializer(result.body);
}

/** Gets a container by name. */
export async function get(
  context: Client,
  deviceName: string,
  storageAccountName: string,
  containerName: string,
  resourceGroupName: string,
  options: ContainersGetOptionalParams = { requestOptions: {} },
): Promise<Container> {
  const result = await _getSend(
    context,
    deviceName,
    storageAccountName,
    containerName,
    resourceGroupName,
    options,
  );
  return _getDeserialize(result);
}
