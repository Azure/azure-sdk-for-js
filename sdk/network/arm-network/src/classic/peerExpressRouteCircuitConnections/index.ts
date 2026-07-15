// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, get } from "../../api/peerExpressRouteCircuitConnections/operations.js";
import type {
  PeerExpressRouteCircuitConnectionsListOptionalParams,
  PeerExpressRouteCircuitConnectionsGetOptionalParams,
} from "../../api/peerExpressRouteCircuitConnections/options.js";
import type { PeerExpressRouteCircuitConnection } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PeerExpressRouteCircuitConnections operations. */
export interface PeerExpressRouteCircuitConnectionsOperations {
  /** Gets all global reach peer connections associated with a private peering in an express route circuit. */
  list: (
    resourceGroupName: string,
    circuitName: string,
    peeringName: string,
    options?: PeerExpressRouteCircuitConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<PeerExpressRouteCircuitConnection>;
  /** Gets the specified Peer Express Route Circuit Connection from the specified express route circuit. */
  get: (
    resourceGroupName: string,
    circuitName: string,
    peeringName: string,
    connectionName: string,
    options?: PeerExpressRouteCircuitConnectionsGetOptionalParams,
  ) => Promise<PeerExpressRouteCircuitConnection>;
}

function _getPeerExpressRouteCircuitConnections(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      circuitName: string,
      peeringName: string,
      options?: PeerExpressRouteCircuitConnectionsListOptionalParams,
    ) => list(context, resourceGroupName, circuitName, peeringName, options),
    get: (
      resourceGroupName: string,
      circuitName: string,
      peeringName: string,
      connectionName: string,
      options?: PeerExpressRouteCircuitConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, circuitName, peeringName, connectionName, options),
  };
}

export function _getPeerExpressRouteCircuitConnectionsOperations(
  context: NetworkManagementContext,
): PeerExpressRouteCircuitConnectionsOperations {
  return {
    ..._getPeerExpressRouteCircuitConnections(context),
  };
}
