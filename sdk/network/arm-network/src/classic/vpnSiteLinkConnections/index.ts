// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { get } from "../../api/vpnSiteLinkConnections/operations.js";
import type { VpnSiteLinkConnectionsGetOptionalParams } from "../../api/vpnSiteLinkConnections/options.js";
import type { VpnSiteLinkConnection } from "../../models/microsoft/network/models.js";

/** Interface representing a VpnSiteLinkConnections operations. */
export interface VpnSiteLinkConnectionsOperations {
  /** Retrieves the details of a vpn site link connection. */
  get: (
    resourceGroupName: string,
    gatewayName: string,
    connectionName: string,
    linkConnectionName: string,
    options?: VpnSiteLinkConnectionsGetOptionalParams,
  ) => Promise<VpnSiteLinkConnection>;
}

function _getVpnSiteLinkConnections(context: NetworkManagementContext) {
  return {
    get: (
      resourceGroupName: string,
      gatewayName: string,
      connectionName: string,
      linkConnectionName: string,
      options?: VpnSiteLinkConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, gatewayName, connectionName, linkConnectionName, options),
  };
}

export function _getVpnSiteLinkConnectionsOperations(
  context: NetworkManagementContext,
): VpnSiteLinkConnectionsOperations {
  return {
    ..._getVpnSiteLinkConnections(context),
  };
}
