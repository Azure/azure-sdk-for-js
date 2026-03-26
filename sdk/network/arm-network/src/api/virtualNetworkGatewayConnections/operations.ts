// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  TagsObject,
  VpnPacketCaptureStopParameters,
  VirtualNetworkGatewayConnection,
  ConnectionSharedKey,
  ConnectionResetSharedKey,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  tagsObjectSerializer,
  errorDeserializer,
  errorResponseDeserializer,
  vpnPacketCaptureStartParametersSerializer,
  vpnPacketCaptureStopParametersSerializer,
  virtualNetworkGatewayConnectionSerializer,
  virtualNetworkGatewayConnectionDeserializer,
  connectionSharedKeySerializer,
  connectionSharedKeyDeserializer,
  connectionResetSharedKeySerializer,
  connectionResetSharedKeyDeserializer,
  _startPacketCaptureFinalResult1Deserializer,
  _stopPacketCaptureFinalResult1Deserializer,
} from "../../models/microsoft/network/models.js";
import type { _VirtualNetworkGatewayConnectionListResult } from "../../models/models.js";
import { _virtualNetworkGatewayConnectionListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualNetworkGatewayConnectionsResetConnectionOptionalParams,
  VirtualNetworkGatewayConnectionsGetIkeSasOptionalParams,
  VirtualNetworkGatewayConnectionsStopPacketCaptureOptionalParams,
  VirtualNetworkGatewayConnectionsStartPacketCaptureOptionalParams,
  VirtualNetworkGatewayConnectionsResetSharedKeyOptionalParams,
  VirtualNetworkGatewayConnectionsGetSharedKeyOptionalParams,
  VirtualNetworkGatewayConnectionsSetSharedKeyOptionalParams,
  VirtualNetworkGatewayConnectionsListOptionalParams,
  VirtualNetworkGatewayConnectionsDeleteOptionalParams,
  VirtualNetworkGatewayConnectionsUpdateTagsOptionalParams,
  VirtualNetworkGatewayConnectionsCreateOrUpdateOptionalParams,
  VirtualNetworkGatewayConnectionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _resetConnectionSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayConnectionName: string,
  options: VirtualNetworkGatewayConnectionsResetConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}/resetconnection{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayConnectionName: virtualNetworkGatewayConnectionName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _resetConnectionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Resets the virtual network gateway connection specified. */
export function resetConnection(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayConnectionName: string,
  options: VirtualNetworkGatewayConnectionsResetConnectionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _resetConnectionDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resetConnectionSend(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getIkeSasSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayConnectionName: string,
  options: VirtualNetworkGatewayConnectionsGetIkeSasOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}/getikesas{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayConnectionName: virtualNetworkGatewayConnectionName,
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

export async function _getIkeSasDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Lists IKE Security Associations for the virtual network gateway connection in the specified resource group. */
export function getIkeSas(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayConnectionName: string,
  options: VirtualNetworkGatewayConnectionsGetIkeSasOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _getIkeSasDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _getIkeSasSend(context, resourceGroupName, virtualNetworkGatewayConnectionName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _stopPacketCaptureSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayConnectionName: string,
  parameters: VpnPacketCaptureStopParameters,
  options: VirtualNetworkGatewayConnectionsStopPacketCaptureOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}/stopPacketCapture{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayConnectionName: virtualNetworkGatewayConnectionName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: vpnPacketCaptureStopParametersSerializer(parameters),
  });
}

export async function _stopPacketCaptureDeserialize(result: PathUncheckedResponse): Promise<{
  body: string;
}> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return _stopPacketCaptureFinalResult1Deserializer(result.body);
}

/** Stops packet capture on virtual network gateway connection in the specified resource group. */
export function stopPacketCapture(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayConnectionName: string,
  parameters: VpnPacketCaptureStopParameters,
  options: VirtualNetworkGatewayConnectionsStopPacketCaptureOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<{
    body: string;
  }>,
  {
    body: string;
  }
> {
  return getLongRunningPoller(context, _stopPacketCaptureDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _stopPacketCaptureSend(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<
    OperationState<{
      body: string;
    }>,
    {
      body: string;
    }
  >;
}

export function _startPacketCaptureSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayConnectionName: string,
  options: VirtualNetworkGatewayConnectionsStartPacketCaptureOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}/startPacketCapture{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayConnectionName: virtualNetworkGatewayConnectionName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["parameters"]
      ? options["parameters"]
      : vpnPacketCaptureStartParametersSerializer(options["parameters"]),
  });
}

export async function _startPacketCaptureDeserialize(result: PathUncheckedResponse): Promise<{
  body: string;
}> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return _startPacketCaptureFinalResult1Deserializer(result.body);
}

/** Starts packet capture on virtual network gateway connection in the specified resource group. */
export function startPacketCapture(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayConnectionName: string,
  options: VirtualNetworkGatewayConnectionsStartPacketCaptureOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<{
    body: string;
  }>,
  {
    body: string;
  }
> {
  return getLongRunningPoller(context, _startPacketCaptureDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _startPacketCaptureSend(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<
    OperationState<{
      body: string;
    }>,
    {
      body: string;
    }
  >;
}

export function _resetSharedKeySend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayConnectionName: string,
  parameters: ConnectionResetSharedKey,
  options: VirtualNetworkGatewayConnectionsResetSharedKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}/sharedkey/reset{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayConnectionName: virtualNetworkGatewayConnectionName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: connectionResetSharedKeySerializer(parameters),
  });
}

export async function _resetSharedKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectionResetSharedKey> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return connectionResetSharedKeyDeserializer(result.body);
}

/** The VirtualNetworkGatewayConnectionResetSharedKey operation resets the virtual network gateway connection shared key for passed virtual network gateway connection in the specified resource group through Network resource provider. */
export function resetSharedKey(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayConnectionName: string,
  parameters: ConnectionResetSharedKey,
  options: VirtualNetworkGatewayConnectionsResetSharedKeyOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ConnectionResetSharedKey>, ConnectionResetSharedKey> {
  return getLongRunningPoller(context, _resetSharedKeyDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resetSharedKeySend(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<ConnectionResetSharedKey>, ConnectionResetSharedKey>;
}

export function _getSharedKeySend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayConnectionName: string,
  options: VirtualNetworkGatewayConnectionsGetSharedKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}/sharedkey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayConnectionName: virtualNetworkGatewayConnectionName,
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

export async function _getSharedKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectionSharedKey> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return connectionSharedKeyDeserializer(result.body);
}

/** The Get VirtualNetworkGatewayConnectionSharedKey operation retrieves information about the specified virtual network gateway connection shared key through Network resource provider. */
export async function getSharedKey(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayConnectionName: string,
  options: VirtualNetworkGatewayConnectionsGetSharedKeyOptionalParams = { requestOptions: {} },
): Promise<ConnectionSharedKey> {
  const result = await _getSharedKeySend(
    context,
    resourceGroupName,
    virtualNetworkGatewayConnectionName,
    options,
  );
  return _getSharedKeyDeserialize(result);
}

export function _setSharedKeySend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayConnectionName: string,
  parameters: ConnectionSharedKey,
  options: VirtualNetworkGatewayConnectionsSetSharedKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}/sharedkey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayConnectionName: virtualNetworkGatewayConnectionName,
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
    body: connectionSharedKeySerializer(parameters),
  });
}

export async function _setSharedKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectionSharedKey> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return connectionSharedKeyDeserializer(result.body);
}

/** The Put VirtualNetworkGatewayConnectionSharedKey operation sets the virtual network gateway connection shared key for passed virtual network gateway connection in the specified resource group through Network resource provider. */
export function setSharedKey(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayConnectionName: string,
  parameters: ConnectionSharedKey,
  options: VirtualNetworkGatewayConnectionsSetSharedKeyOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ConnectionSharedKey>, ConnectionSharedKey> {
  return getLongRunningPoller(context, _setSharedKeyDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _setSharedKeySend(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<ConnectionSharedKey>, ConnectionSharedKey>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  options: VirtualNetworkGatewayConnectionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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
): Promise<_VirtualNetworkGatewayConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _virtualNetworkGatewayConnectionListResultDeserializer(result.body);
}

/** The List VirtualNetworkGatewayConnections operation retrieves all the virtual network gateways connections created. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: VirtualNetworkGatewayConnectionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VirtualNetworkGatewayConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayConnectionName: string,
  options: VirtualNetworkGatewayConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayConnectionName: virtualNetworkGatewayConnectionName,
      "api%2Dversion": "2025-05-01",
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
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the specified virtual network Gateway connection. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayConnectionName: string,
  options: VirtualNetworkGatewayConnectionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, virtualNetworkGatewayConnectionName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayConnectionName: string,
  parameters: TagsObject,
  options: VirtualNetworkGatewayConnectionsUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayConnectionName: virtualNetworkGatewayConnectionName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: tagsObjectSerializer(parameters),
  });
}

export async function _updateTagsDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualNetworkGatewayConnection> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualNetworkGatewayConnectionDeserializer(result.body);
}

/** Updates a virtual network gateway connection tags. */
export function updateTags(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayConnectionName: string,
  parameters: TagsObject,
  options: VirtualNetworkGatewayConnectionsUpdateTagsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VirtualNetworkGatewayConnection>, VirtualNetworkGatewayConnection> {
  return getLongRunningPoller(context, _updateTagsDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateTagsSend(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<
    OperationState<VirtualNetworkGatewayConnection>,
    VirtualNetworkGatewayConnection
  >;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayConnectionName: string,
  parameters: VirtualNetworkGatewayConnection,
  options: VirtualNetworkGatewayConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayConnectionName: virtualNetworkGatewayConnectionName,
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
    body: virtualNetworkGatewayConnectionSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualNetworkGatewayConnection> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualNetworkGatewayConnectionDeserializer(result.body);
}

/** Creates or updates a virtual network gateway connection in the specified resource group. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayConnectionName: string,
  parameters: VirtualNetworkGatewayConnection,
  options: VirtualNetworkGatewayConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VirtualNetworkGatewayConnection>, VirtualNetworkGatewayConnection> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<
    OperationState<VirtualNetworkGatewayConnection>,
    VirtualNetworkGatewayConnection
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayConnectionName: string,
  options: VirtualNetworkGatewayConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayConnectionName: virtualNetworkGatewayConnectionName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualNetworkGatewayConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualNetworkGatewayConnectionDeserializer(result.body);
}

/** Gets the specified virtual network gateway connection by resource group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayConnectionName: string,
  options: VirtualNetworkGatewayConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<VirtualNetworkGatewayConnection> {
  const result = await _getSend(
    context,
    resourceGroupName,
    virtualNetworkGatewayConnectionName,
    options,
  );
  return _getDeserialize(result);
}
