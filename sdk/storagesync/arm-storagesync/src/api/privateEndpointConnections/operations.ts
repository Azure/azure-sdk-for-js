// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftStorageSyncContext as Client } from "../index.js";
import type {
  PrivateEndpointConnection,
  _PrivateEndpointConnectionListResult,
} from "../../models/models.js";
import {
  storageSyncErrorDeserializer,
  privateEndpointConnectionSerializer,
  privateEndpointConnectionDeserializer,
  _privateEndpointConnectionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PrivateEndpointConnectionsListByStorageSyncServiceOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByStorageSyncServiceSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  options: PrivateEndpointConnectionsListByStorageSyncServiceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/privateEndpointConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
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

export async function _listByStorageSyncServiceDeserialize(
  result: PathUncheckedResponse,
): Promise<_PrivateEndpointConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return _privateEndpointConnectionListResultDeserializer(result.body);
}

/** Get a PrivateEndpointConnection List. */
export function listByStorageSyncService(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  options: PrivateEndpointConnectionsListByStorageSyncServiceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PrivateEndpointConnection> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByStorageSyncServiceSend(context, resourceGroupName, storageSyncServiceName, options),
    _listByStorageSyncServiceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2022-09-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
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
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the specified private endpoint connection associated with the storage sync service. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        storageSyncServiceName,
        privateEndpointConnectionName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2022-09-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  privateEndpointConnectionName: string,
  properties: PrivateEndpointConnection,
  options: PrivateEndpointConnectionsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
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

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateEndpointConnection> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return privateEndpointConnectionDeserializer(result.body);
}

/** Update the state of specified private endpoint connection associated with the storage sync service. */
export function create(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  privateEndpointConnectionName: string,
  properties: PrivateEndpointConnection,
  options: PrivateEndpointConnectionsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        storageSyncServiceName,
        privateEndpointConnectionName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2022-09-01",
  }) as PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
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
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return privateEndpointConnectionDeserializer(result.body);
}

/** Gets the specified private endpoint connection associated with the storage sync service. */
export async function get(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<PrivateEndpointConnection> {
  const result = await _getSend(
    context,
    resourceGroupName,
    storageSyncServiceName,
    privateEndpointConnectionName,
    options,
  );
  return _getDeserialize(result);
}
