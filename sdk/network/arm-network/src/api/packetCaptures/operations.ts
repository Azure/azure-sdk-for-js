// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  NetworkWatcher,
  PacketCapture,
  PacketCaptureResult,
  PacketCaptureQueryStatusResult,
  _PacketCaptureListResult,
} from "../../models/microsoft/network/models.js";
import {
  networkWatcherDeserializer,
  errorResponseDeserializer,
  packetCaptureSerializer,
  packetCaptureResultDeserializer,
  packetCaptureQueryStatusResultDeserializer,
  _packetCaptureListResultDeserializer,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PacketCapturesListOptionalParams,
  PacketCapturesGetStatusOptionalParams,
  PacketCapturesStopOptionalParams,
  PacketCapturesDeleteOptionalParams,
  PacketCapturesGetOptionalParams,
  PacketCapturesCreateOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  options: PacketCapturesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/packetCaptures{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkWatcherName: networkWatcherName,
      "api%2Dversion": "2025-05-01",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_PacketCaptureListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _packetCaptureListResultDeserializer(result.body);
}

/** Lists all packet capture sessions within the specified resource group. */
export function list(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  options: PacketCapturesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PacketCaptureResult> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, networkWatcherName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _getStatusSend(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  packetCaptureName: string,
  options: PacketCapturesGetStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/packetCaptures/{packetCaptureName}/queryStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkWatcherName: networkWatcherName,
      packetCaptureName: packetCaptureName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<PacketCaptureQueryStatusResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return packetCaptureQueryStatusResultDeserializer(result.body);
}

/** Query the status of a running packet capture session. */
export function getStatus(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  packetCaptureName: string,
  options: PacketCapturesGetStatusOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PacketCaptureQueryStatusResult>, PacketCaptureQueryStatusResult> {
  return getLongRunningPoller(context, _getStatusDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _getStatusSend(context, resourceGroupName, networkWatcherName, packetCaptureName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<PacketCaptureQueryStatusResult>, PacketCaptureQueryStatusResult>;
}

export function _stopSend(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  packetCaptureName: string,
  options: PacketCapturesStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/packetCaptures/{packetCaptureName}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkWatcherName: networkWatcherName,
      packetCaptureName: packetCaptureName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _stopDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Stops a specified packet capture session. */
export function stop(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  packetCaptureName: string,
  options: PacketCapturesStopOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _stopDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _stopSend(context, resourceGroupName, networkWatcherName, packetCaptureName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  packetCaptureName: string,
  options: PacketCapturesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/packetCaptures/{packetCaptureName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkWatcherName: networkWatcherName,
      packetCaptureName: packetCaptureName,
      "api%2Dversion": "2025-05-01",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the specified packet capture session. */
/**
 *  @fixme Delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  packetCaptureName: string,
  options: PacketCapturesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, networkWatcherName, packetCaptureName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  packetCaptureName: string,
  options: PacketCapturesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/packetCaptures/{packetCaptureName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkWatcherName: networkWatcherName,
      packetCaptureName: packetCaptureName,
      "api%2Dversion": "2025-05-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PacketCaptureResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return packetCaptureResultDeserializer(result.body);
}

/** Gets a packet capture session by name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  packetCaptureName: string,
  options: PacketCapturesGetOptionalParams = { requestOptions: {} },
): Promise<PacketCaptureResult> {
  const result = await _getSend(
    context,
    resourceGroupName,
    networkWatcherName,
    packetCaptureName,
    options,
  );
  return _getDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  packetCaptureName: string,
  parameters: PacketCapture,
  options: PacketCapturesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/packetCaptures/{packetCaptureName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkWatcherName: networkWatcherName,
      packetCaptureName: packetCaptureName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: packetCaptureSerializer(parameters),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<NetworkWatcher> {
  const expectedStatuses = ["201", "200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkWatcherDeserializer(result.body);
}

/** Create and start a packet capture on the specified VM. */
export function create(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  packetCaptureName: string,
  parameters: PacketCapture,
  options: PacketCapturesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NetworkWatcher>, NetworkWatcher> {
  return getLongRunningPoller(context, _createDeserialize, ["201", "200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        networkWatcherName,
        packetCaptureName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<NetworkWatcher>, NetworkWatcher>;
}
