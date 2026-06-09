// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftStorageSyncContext as Client } from "../index.js";
import type {
  ServerEndpoint,
  ServerEndpointCreateParameters,
  _ServerEndpointArray,
  RecallActionParameters,
} from "../../models/models.js";
import {
  storageSyncErrorDeserializer,
  serverEndpointDeserializer,
  serverEndpointCreateParametersSerializer,
  serverEndpointUpdateParametersSerializer,
  _serverEndpointArrayDeserializer,
  recallActionParametersSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ServerEndpointsRecallActionOptionalParams,
  ServerEndpointsListBySyncGroupOptionalParams,
  ServerEndpointsDeleteOptionalParams,
  ServerEndpointsUpdateOptionalParams,
  ServerEndpointsCreateOptionalParams,
  ServerEndpointsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _recallActionSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  serverEndpointName: string,
  parameters: RecallActionParameters,
  options: ServerEndpointsRecallActionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/serverEndpoints/{serverEndpointName}/recallAction{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      syncGroupName: syncGroupName,
      serverEndpointName: serverEndpointName,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: recallActionParametersSerializer(parameters),
  });
}

export async function _recallActionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Recall a server endpoint. */
export function recallAction(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  serverEndpointName: string,
  parameters: RecallActionParameters,
  options: ServerEndpointsRecallActionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _recallActionDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _recallActionSend(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        serverEndpointName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2022-09-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listBySyncGroupSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  options: ServerEndpointsListBySyncGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/serverEndpoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      syncGroupName: syncGroupName,
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

export async function _listBySyncGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ServerEndpointArray> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return _serverEndpointArrayDeserializer(result.body);
}

/** Get a ServerEndpoint list. */
export function listBySyncGroup(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  options: ServerEndpointsListBySyncGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ServerEndpoint> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listBySyncGroupSend(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        options,
      ),
    _listBySyncGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2022-09-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  serverEndpointName: string,
  options: ServerEndpointsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/serverEndpoints/{serverEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      syncGroupName: syncGroupName,
      serverEndpointName: serverEndpointName,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a given ServerEndpoint. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  serverEndpointName: string,
  options: ServerEndpointsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        serverEndpointName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2022-09-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  serverEndpointName: string,
  options: ServerEndpointsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/serverEndpoints/{serverEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      syncGroupName: syncGroupName,
      serverEndpointName: serverEndpointName,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options?.parameters
      ? options?.parameters
      : serverEndpointUpdateParametersSerializer(options?.parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ServerEndpoint> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return serverEndpointDeserializer(result.body);
}

/** Patch a given ServerEndpoint. */
export function update(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  serverEndpointName: string,
  options: ServerEndpointsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ServerEndpoint>, ServerEndpoint> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        serverEndpointName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2022-09-01",
  }) as PollerLike<OperationState<ServerEndpoint>, ServerEndpoint>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  serverEndpointName: string,
  parameters: ServerEndpointCreateParameters,
  options: ServerEndpointsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/serverEndpoints/{serverEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      syncGroupName: syncGroupName,
      serverEndpointName: serverEndpointName,
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
    body: serverEndpointCreateParametersSerializer(parameters),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<ServerEndpoint> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return serverEndpointDeserializer(result.body);
}

/** Create a new ServerEndpoint. */
export function create(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  serverEndpointName: string,
  parameters: ServerEndpointCreateParameters,
  options: ServerEndpointsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ServerEndpoint>, ServerEndpoint> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        serverEndpointName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2022-09-01",
  }) as PollerLike<OperationState<ServerEndpoint>, ServerEndpoint>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  serverEndpointName: string,
  options: ServerEndpointsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/serverEndpoints/{serverEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      syncGroupName: syncGroupName,
      serverEndpointName: serverEndpointName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ServerEndpoint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return serverEndpointDeserializer(result.body);
}

/** Get a ServerEndpoint. */
export async function get(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  serverEndpointName: string,
  options: ServerEndpointsGetOptionalParams = { requestOptions: {} },
): Promise<ServerEndpoint> {
  const result = await _getSend(
    context,
    resourceGroupName,
    storageSyncServiceName,
    syncGroupName,
    serverEndpointName,
    options,
  );
  return _getDeserialize(result);
}
