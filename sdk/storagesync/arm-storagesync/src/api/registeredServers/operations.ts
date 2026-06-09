// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftStorageSyncContext as Client } from "../index.js";
import type {
  RegisteredServer,
  RegisteredServerCreateParameters,
  RegisteredServerUpdateParameters,
  _RegisteredServerArray,
  TriggerRolloverRequest,
} from "../../models/models.js";
import {
  storageSyncErrorDeserializer,
  registeredServerDeserializer,
  registeredServerCreateParametersSerializer,
  registeredServerUpdateParametersSerializer,
  errorResponseDeserializer,
  _registeredServerArrayDeserializer,
  triggerRolloverRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RegisteredServersTriggerRolloverOptionalParams,
  RegisteredServersListByStorageSyncServiceOptionalParams,
  RegisteredServersDeleteOptionalParams,
  RegisteredServersUpdateOptionalParams,
  RegisteredServersCreateOptionalParams,
  RegisteredServersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _triggerRolloverSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  serverId: string,
  parameters: TriggerRolloverRequest,
  options: RegisteredServersTriggerRolloverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/registeredServers/{serverId}/triggerRollover{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      serverId: serverId,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: triggerRolloverRequestSerializer(parameters),
  });
}

export async function _triggerRolloverDeserialize(result: PathUncheckedResponse): Promise<void> {
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

/** Triggers Server certificate rollover. */
export function triggerRollover(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  serverId: string,
  parameters: TriggerRolloverRequest,
  options: RegisteredServersTriggerRolloverOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _triggerRolloverDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _triggerRolloverSend(
        context,
        resourceGroupName,
        storageSyncServiceName,
        serverId,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2022-09-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByStorageSyncServiceSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  options: RegisteredServersListByStorageSyncServiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/registeredServers{?api%2Dversion}",
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
): Promise<_RegisteredServerArray> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return _registeredServerArrayDeserializer(result.body);
}

/** Get a given registered server list. */
export function listByStorageSyncService(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  options: RegisteredServersListByStorageSyncServiceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RegisteredServer> {
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
  serverId: string,
  options: RegisteredServersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/registeredServers/{serverId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      serverId: serverId,
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

/** Delete the given registered server. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  serverId: string,
  options: RegisteredServersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, storageSyncServiceName, serverId, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2022-09-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  serverId: string,
  parameters: RegisteredServerUpdateParameters,
  options: RegisteredServersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/registeredServers/{serverId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      serverId: serverId,
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
    body: registeredServerUpdateParametersSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<RegisteredServer> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return registeredServerDeserializer(result.body);
}

/** Update registered server. */
export function update(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  serverId: string,
  parameters: RegisteredServerUpdateParameters,
  options: RegisteredServersUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RegisteredServer>, RegisteredServer> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        storageSyncServiceName,
        serverId,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2022-09-01",
  }) as PollerLike<OperationState<RegisteredServer>, RegisteredServer>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  serverId: string,
  parameters: RegisteredServerCreateParameters,
  options: RegisteredServersCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/registeredServers/{serverId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      serverId: serverId,
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
    body: registeredServerCreateParametersSerializer(parameters),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<RegisteredServer> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return registeredServerDeserializer(result.body);
}

/** Add a new registered server. */
export function create(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  serverId: string,
  parameters: RegisteredServerCreateParameters,
  options: RegisteredServersCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RegisteredServer>, RegisteredServer> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        storageSyncServiceName,
        serverId,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2022-09-01",
  }) as PollerLike<OperationState<RegisteredServer>, RegisteredServer>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  serverId: string,
  options: RegisteredServersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/registeredServers/{serverId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      serverId: serverId,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RegisteredServer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return registeredServerDeserializer(result.body);
}

/** Get a given registered server. */
export async function get(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  serverId: string,
  options: RegisteredServersGetOptionalParams = { requestOptions: {} },
): Promise<RegisteredServer> {
  const result = await _getSend(
    context,
    resourceGroupName,
    storageSyncServiceName,
    serverId,
    options,
  );
  return _getDeserialize(result);
}
