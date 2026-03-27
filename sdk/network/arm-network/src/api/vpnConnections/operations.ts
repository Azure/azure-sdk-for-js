// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  VpnConnection,
  _ListVpnConnectionsResult,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  vpnConnectionSerializer,
  vpnConnectionDeserializer,
  vpnConnectionPacketCaptureStartParametersSerializer,
  vpnConnectionPacketCaptureStopParametersSerializer,
  _listVpnConnectionsResultDeserializer,
} from "../../models/microsoft/network/models.js";
import type { ArmAcceptedLroResponse12, ArmAcceptedLroResponse13 } from "../../models/models.js";
import {
  armAcceptedLroResponse12Deserializer,
  armAcceptedLroResponse13Deserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VpnConnectionsListByVpnGatewayOptionalParams,
  VpnConnectionsStopPacketCaptureOptionalParams,
  VpnConnectionsStartPacketCaptureOptionalParams,
  VpnConnectionsDeleteOptionalParams,
  VpnConnectionsCreateOrUpdateOptionalParams,
  VpnConnectionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByVpnGatewaySend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  options: VpnConnectionsListByVpnGatewayOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/vpnConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
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

export async function _listByVpnGatewayDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListVpnConnectionsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _listVpnConnectionsResultDeserializer(result.body);
}

/** Retrieves all vpn connections for a particular virtual wan vpn gateway. */
export function listByVpnGateway(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  options: VpnConnectionsListByVpnGatewayOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VpnConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listByVpnGatewaySend(context, resourceGroupName, gatewayName, options),
    _listByVpnGatewayDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _stopPacketCaptureSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  vpnConnectionName: string,
  options: VpnConnectionsStopPacketCaptureOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/vpnConnections/{vpnConnectionName}/stoppacketcapture{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
      vpnConnectionName: vpnConnectionName,
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
      : vpnConnectionPacketCaptureStopParametersSerializer(options["parameters"]),
  });
}

export async function _stopPacketCaptureDeserialize(
  result: PathUncheckedResponse,
): Promise<ArmAcceptedLroResponse13> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return armAcceptedLroResponse13Deserializer(result.body);
}

/** Stops packet capture on Vpn connection in the specified resource group. */
export function stopPacketCapture(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  vpnConnectionName: string,
  options: VpnConnectionsStopPacketCaptureOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ArmAcceptedLroResponse13>, ArmAcceptedLroResponse13> {
  return getLongRunningPoller(context, _stopPacketCaptureDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _stopPacketCaptureSend(context, resourceGroupName, gatewayName, vpnConnectionName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<ArmAcceptedLroResponse13>, ArmAcceptedLroResponse13>;
}

export function _startPacketCaptureSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  vpnConnectionName: string,
  options: VpnConnectionsStartPacketCaptureOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/vpnConnections/{vpnConnectionName}/startpacketcapture{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
      vpnConnectionName: vpnConnectionName,
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
      : vpnConnectionPacketCaptureStartParametersSerializer(options["parameters"]),
  });
}

export async function _startPacketCaptureDeserialize(
  result: PathUncheckedResponse,
): Promise<ArmAcceptedLroResponse12> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return armAcceptedLroResponse12Deserializer(result.body);
}

/** Starts packet capture on Vpn connection in the specified resource group. */
export function startPacketCapture(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  vpnConnectionName: string,
  options: VpnConnectionsStartPacketCaptureOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ArmAcceptedLroResponse12>, ArmAcceptedLroResponse12> {
  return getLongRunningPoller(context, _startPacketCaptureDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _startPacketCaptureSend(context, resourceGroupName, gatewayName, vpnConnectionName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<ArmAcceptedLroResponse12>, ArmAcceptedLroResponse12>;
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  connectionName: string,
  options: VpnConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/vpnConnections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
      connectionName: connectionName,
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

/** Deletes a vpn connection. */
/**
 *  @fixme Delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  connectionName: string,
  options: VpnConnectionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, gatewayName, connectionName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  connectionName: string,
  vpnConnectionParameters: VpnConnection,
  options: VpnConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/vpnConnections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
      connectionName: connectionName,
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
    body: vpnConnectionSerializer(vpnConnectionParameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<VpnConnection> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return vpnConnectionDeserializer(result.body);
}

/** Creates a vpn connection to a scalable vpn gateway if it doesn't exist else updates the existing connection. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  connectionName: string,
  vpnConnectionParameters: VpnConnection,
  options: VpnConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VpnConnection>, VpnConnection> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        gatewayName,
        connectionName,
        vpnConnectionParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<VpnConnection>, VpnConnection>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  connectionName: string,
  options: VpnConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/vpnConnections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
      connectionName: connectionName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<VpnConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return vpnConnectionDeserializer(result.body);
}

/** Retrieves the details of a vpn connection. */
export async function get(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  connectionName: string,
  options: VpnConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<VpnConnection> {
  const result = await _getSend(context, resourceGroupName, gatewayName, connectionName, options);
  return _getDeserialize(result);
}
