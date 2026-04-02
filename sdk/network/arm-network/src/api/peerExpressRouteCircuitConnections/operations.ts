// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { PeerExpressRouteCircuitConnection } from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  peerExpressRouteCircuitConnectionDeserializer,
} from "../../models/microsoft/network/models.js";
import type { _PeerExpressRouteCircuitConnectionListResult } from "../../models/models.js";
import { _peerExpressRouteCircuitConnectionListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PeerExpressRouteCircuitConnectionsListOptionalParams,
  PeerExpressRouteCircuitConnectionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  peeringName: string,
  options: PeerExpressRouteCircuitConnectionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/peerings/{peeringName}/peerConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      circuitName: circuitName,
      peeringName: peeringName,
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
): Promise<_PeerExpressRouteCircuitConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _peerExpressRouteCircuitConnectionListResultDeserializer(result.body);
}

/** Gets all global reach peer connections associated with a private peering in an express route circuit. */
export function list(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  peeringName: string,
  options: PeerExpressRouteCircuitConnectionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PeerExpressRouteCircuitConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, circuitName, peeringName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  peeringName: string,
  connectionName: string,
  options: PeerExpressRouteCircuitConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/peerings/{peeringName}/peerConnections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      circuitName: circuitName,
      peeringName: peeringName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<PeerExpressRouteCircuitConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return peerExpressRouteCircuitConnectionDeserializer(result.body);
}

/** Gets the specified Peer Express Route Circuit Connection from the specified express route circuit. */
export async function get(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  peeringName: string,
  connectionName: string,
  options: PeerExpressRouteCircuitConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<PeerExpressRouteCircuitConnection> {
  const result = await _getSend(
    context,
    resourceGroupName,
    circuitName,
    peeringName,
    connectionName,
    options,
  );
  return _getDeserialize(result);
}
