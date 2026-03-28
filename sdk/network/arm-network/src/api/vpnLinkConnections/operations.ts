// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  VpnSiteLinkConnection,
  ConnectionSharedKeyResult,
  _ConnectionSharedKeyResultList,
  _ListVpnSiteLinkConnectionsResult,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  errorResponseDeserializer,
  connectionSharedKeyResultSerializer,
  connectionSharedKeyResultDeserializer,
  _connectionSharedKeyResultListDeserializer,
  _listVpnSiteLinkConnectionsResultDeserializer,
} from "../../models/microsoft/network/models.js";
import type { ArmAcceptedLroResponse14 } from "../../models/models.js";
import { armAcceptedLroResponse14Deserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VpnLinkConnectionsGetIkeSasOptionalParams,
  VpnLinkConnectionsResetConnectionOptionalParams,
  VpnLinkConnectionsListByVpnConnectionOptionalParams,
  VpnLinkConnectionsListDefaultSharedKeyOptionalParams,
  VpnLinkConnectionsListAllSharedKeysOptionalParams,
  VpnLinkConnectionsSetOrInitDefaultSharedKeyOptionalParams,
  VpnLinkConnectionsGetDefaultSharedKeyOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getIkeSasSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  connectionName: string,
  linkConnectionName: string,
  options: VpnLinkConnectionsGetIkeSasOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/vpnConnections/{connectionName}/vpnLinkConnections/{linkConnectionName}/getikesas{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
      connectionName: connectionName,
      linkConnectionName: linkConnectionName,
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

export async function _getIkeSasDeserialize(
  result: PathUncheckedResponse,
): Promise<ArmAcceptedLroResponse14> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return armAcceptedLroResponse14Deserializer(result.body);
}

/** Lists IKE Security Associations for Vpn Site Link Connection in the specified resource group. */
export function getIkeSas(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  connectionName: string,
  linkConnectionName: string,
  options: VpnLinkConnectionsGetIkeSasOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ArmAcceptedLroResponse14>, ArmAcceptedLroResponse14> {
  return getLongRunningPoller(context, _getIkeSasDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _getIkeSasSend(
        context,
        resourceGroupName,
        gatewayName,
        connectionName,
        linkConnectionName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<ArmAcceptedLroResponse14>, ArmAcceptedLroResponse14>;
}

export function _resetConnectionSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  connectionName: string,
  linkConnectionName: string,
  options: VpnLinkConnectionsResetConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/vpnConnections/{connectionName}/vpnLinkConnections/{linkConnectionName}/resetconnection{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
      connectionName: connectionName,
      linkConnectionName: linkConnectionName,
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

/** Resets the VpnLink connection specified. */
export function resetConnection(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  connectionName: string,
  linkConnectionName: string,
  options: VpnLinkConnectionsResetConnectionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _resetConnectionDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resetConnectionSend(
        context,
        resourceGroupName,
        gatewayName,
        connectionName,
        linkConnectionName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByVpnConnectionSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  connectionName: string,
  options: VpnLinkConnectionsListByVpnConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/vpnConnections/{connectionName}/vpnLinkConnections{?api%2Dversion}",
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

export async function _listByVpnConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListVpnSiteLinkConnectionsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _listVpnSiteLinkConnectionsResultDeserializer(result.body);
}

/** Retrieves all vpn site link connections for a particular virtual wan vpn gateway vpn connection. */
export function listByVpnConnection(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  connectionName: string,
  options: VpnLinkConnectionsListByVpnConnectionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VpnSiteLinkConnection> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByVpnConnectionSend(context, resourceGroupName, gatewayName, connectionName, options),
    _listByVpnConnectionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _listDefaultSharedKeySend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  connectionName: string,
  linkConnectionName: string,
  options: VpnLinkConnectionsListDefaultSharedKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/vpnConnections/{connectionName}/vpnLinkConnections/{linkConnectionName}/sharedKeys/default/listSharedKey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
      connectionName: connectionName,
      linkConnectionName: linkConnectionName,
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

export async function _listDefaultSharedKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectionSharedKeyResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return connectionSharedKeyResultDeserializer(result.body);
}

/** Gets the value of the shared key of VpnLink connection specified. */
export async function listDefaultSharedKey(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  connectionName: string,
  linkConnectionName: string,
  options: VpnLinkConnectionsListDefaultSharedKeyOptionalParams = { requestOptions: {} },
): Promise<ConnectionSharedKeyResult> {
  const result = await _listDefaultSharedKeySend(
    context,
    resourceGroupName,
    gatewayName,
    connectionName,
    linkConnectionName,
    options,
  );
  return _listDefaultSharedKeyDeserialize(result);
}

export function _listAllSharedKeysSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  connectionName: string,
  linkConnectionName: string,
  options: VpnLinkConnectionsListAllSharedKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/vpnConnections/{connectionName}/vpnLinkConnections/{linkConnectionName}/sharedKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
      connectionName: connectionName,
      linkConnectionName: linkConnectionName,
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

export async function _listAllSharedKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConnectionSharedKeyResultList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _connectionSharedKeyResultListDeserializer(result.body);
}

/** Lists all shared keys of VpnLink connection specified. */
export function listAllSharedKeys(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  connectionName: string,
  linkConnectionName: string,
  options: VpnLinkConnectionsListAllSharedKeysOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConnectionSharedKeyResult> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listAllSharedKeysSend(
        context,
        resourceGroupName,
        gatewayName,
        connectionName,
        linkConnectionName,
        options,
      ),
    _listAllSharedKeysDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _setOrInitDefaultSharedKeySend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  connectionName: string,
  linkConnectionName: string,
  connectionSharedKeyParameters: ConnectionSharedKeyResult,
  options: VpnLinkConnectionsSetOrInitDefaultSharedKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/vpnConnections/{connectionName}/vpnLinkConnections/{linkConnectionName}/sharedKeys/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
      connectionName: connectionName,
      linkConnectionName: linkConnectionName,
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
    body: connectionSharedKeyResultSerializer(connectionSharedKeyParameters),
  });
}

export async function _setOrInitDefaultSharedKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectionSharedKeyResult> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return connectionSharedKeyResultDeserializer(result.body);
}

/** Sets or auto generates the shared key based on the user input. If users give a shared key value, it does the set operation. If key length is given, the operation creates a random key of the pre-defined length. */
export function setOrInitDefaultSharedKey(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  connectionName: string,
  linkConnectionName: string,
  connectionSharedKeyParameters: ConnectionSharedKeyResult,
  options: VpnLinkConnectionsSetOrInitDefaultSharedKeyOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ConnectionSharedKeyResult>, ConnectionSharedKeyResult> {
  return getLongRunningPoller(
    context,
    _setOrInitDefaultSharedKeyDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _setOrInitDefaultSharedKeySend(
          context,
          resourceGroupName,
          gatewayName,
          connectionName,
          linkConnectionName,
          connectionSharedKeyParameters,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<OperationState<ConnectionSharedKeyResult>, ConnectionSharedKeyResult>;
}

export function _getDefaultSharedKeySend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  connectionName: string,
  linkConnectionName: string,
  options: VpnLinkConnectionsGetDefaultSharedKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/vpnConnections/{connectionName}/vpnLinkConnections/{linkConnectionName}/sharedKeys/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
      connectionName: connectionName,
      linkConnectionName: linkConnectionName,
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

export async function _getDefaultSharedKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectionSharedKeyResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return connectionSharedKeyResultDeserializer(result.body);
}

/** Gets the shared key of VpnLink connection specified. */
export async function getDefaultSharedKey(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  connectionName: string,
  linkConnectionName: string,
  options: VpnLinkConnectionsGetDefaultSharedKeyOptionalParams = { requestOptions: {} },
): Promise<ConnectionSharedKeyResult> {
  const result = await _getDefaultSharedKeySend(
    context,
    resourceGroupName,
    gatewayName,
    connectionName,
    linkConnectionName,
    options,
  );
  return _getDefaultSharedKeyDeserialize(result);
}
