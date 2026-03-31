// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listByVpnGateway,
  stopPacketCapture,
  startPacketCapture,
  $delete,
  createOrUpdate,
  get,
} from "../../api/vpnConnections/operations.js";
import type {
  VpnConnectionsListByVpnGatewayOptionalParams,
  VpnConnectionsStopPacketCaptureOptionalParams,
  VpnConnectionsStartPacketCaptureOptionalParams,
  VpnConnectionsDeleteOptionalParams,
  VpnConnectionsCreateOrUpdateOptionalParams,
  VpnConnectionsGetOptionalParams,
} from "../../api/vpnConnections/options.js";
import type { VpnConnection } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VpnConnections operations. */
export interface VpnConnectionsOperations {
  /** Retrieves all vpn connections for a particular virtual wan vpn gateway. */
  listByVpnGateway: (
    resourceGroupName: string,
    gatewayName: string,
    options?: VpnConnectionsListByVpnGatewayOptionalParams,
  ) => PagedAsyncIterableIterator<VpnConnection>;
  /** Stops packet capture on Vpn connection in the specified resource group. */
  stopPacketCapture: (
    resourceGroupName: string,
    gatewayName: string,
    vpnConnectionName: string,
    options?: VpnConnectionsStopPacketCaptureOptionalParams,
  ) => PollerLike<OperationState<string>, string>;
  /** @deprecated use stopPacketCapture instead */
  beginStopPacketCapture: (
    resourceGroupName: string,
    gatewayName: string,
    vpnConnectionName: string,
    options?: VpnConnectionsStopPacketCaptureOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<string>, string>>;
  /** @deprecated use stopPacketCapture instead */
  beginStopPacketCaptureAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    vpnConnectionName: string,
    options?: VpnConnectionsStopPacketCaptureOptionalParams,
  ) => Promise<string>;
  /** Starts packet capture on Vpn connection in the specified resource group. */
  startPacketCapture: (
    resourceGroupName: string,
    gatewayName: string,
    vpnConnectionName: string,
    options?: VpnConnectionsStartPacketCaptureOptionalParams,
  ) => PollerLike<OperationState<string>, string>;
  /** @deprecated use startPacketCapture instead */
  beginStartPacketCapture: (
    resourceGroupName: string,
    gatewayName: string,
    vpnConnectionName: string,
    options?: VpnConnectionsStartPacketCaptureOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<string>, string>>;
  /** @deprecated use startPacketCapture instead */
  beginStartPacketCaptureAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    vpnConnectionName: string,
    options?: VpnConnectionsStartPacketCaptureOptionalParams,
  ) => Promise<string>;
  /** Deletes a vpn connection. */
  /**
   *  @fixme Delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    gatewayName: string,
    connectionName: string,
    options?: VpnConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    gatewayName: string,
    connectionName: string,
    options?: VpnConnectionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    connectionName: string,
    options?: VpnConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a vpn connection to a scalable vpn gateway if it doesn't exist else updates the existing connection. */
  createOrUpdate: (
    resourceGroupName: string,
    gatewayName: string,
    connectionName: string,
    vpnConnectionParameters: VpnConnection,
    options?: VpnConnectionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VpnConnection>, VpnConnection>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    gatewayName: string,
    connectionName: string,
    vpnConnectionParameters: VpnConnection,
    options?: VpnConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VpnConnection>, VpnConnection>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    connectionName: string,
    vpnConnectionParameters: VpnConnection,
    options?: VpnConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<VpnConnection>;
  /** Retrieves the details of a vpn connection. */
  get: (
    resourceGroupName: string,
    gatewayName: string,
    connectionName: string,
    options?: VpnConnectionsGetOptionalParams,
  ) => Promise<VpnConnection>;
}

function _getVpnConnections(context: NetworkManagementContext) {
  return {
    listByVpnGateway: (
      resourceGroupName: string,
      gatewayName: string,
      options?: VpnConnectionsListByVpnGatewayOptionalParams,
    ) => listByVpnGateway(context, resourceGroupName, gatewayName, options),
    stopPacketCapture: (
      resourceGroupName: string,
      gatewayName: string,
      vpnConnectionName: string,
      options?: VpnConnectionsStopPacketCaptureOptionalParams,
    ) => stopPacketCapture(context, resourceGroupName, gatewayName, vpnConnectionName, options),
    beginStopPacketCapture: async (
      resourceGroupName: string,
      gatewayName: string,
      vpnConnectionName: string,
      options?: VpnConnectionsStopPacketCaptureOptionalParams,
    ) => {
      const poller = stopPacketCapture(
        context,
        resourceGroupName,
        gatewayName,
        vpnConnectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStopPacketCaptureAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      vpnConnectionName: string,
      options?: VpnConnectionsStopPacketCaptureOptionalParams,
    ) => {
      return await stopPacketCapture(
        context,
        resourceGroupName,
        gatewayName,
        vpnConnectionName,
        options,
      );
    },
    startPacketCapture: (
      resourceGroupName: string,
      gatewayName: string,
      vpnConnectionName: string,
      options?: VpnConnectionsStartPacketCaptureOptionalParams,
    ) => startPacketCapture(context, resourceGroupName, gatewayName, vpnConnectionName, options),
    beginStartPacketCapture: async (
      resourceGroupName: string,
      gatewayName: string,
      vpnConnectionName: string,
      options?: VpnConnectionsStartPacketCaptureOptionalParams,
    ) => {
      const poller = startPacketCapture(
        context,
        resourceGroupName,
        gatewayName,
        vpnConnectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartPacketCaptureAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      vpnConnectionName: string,
      options?: VpnConnectionsStartPacketCaptureOptionalParams,
    ) => {
      return await startPacketCapture(
        context,
        resourceGroupName,
        gatewayName,
        vpnConnectionName,
        options,
      );
    },
    delete: (
      resourceGroupName: string,
      gatewayName: string,
      connectionName: string,
      options?: VpnConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, gatewayName, connectionName, options),
    beginDelete: async (
      resourceGroupName: string,
      gatewayName: string,
      connectionName: string,
      options?: VpnConnectionsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, gatewayName, connectionName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      connectionName: string,
      options?: VpnConnectionsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, gatewayName, connectionName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      gatewayName: string,
      connectionName: string,
      vpnConnectionParameters: VpnConnection,
      options?: VpnConnectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        gatewayName,
        connectionName,
        vpnConnectionParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      gatewayName: string,
      connectionName: string,
      vpnConnectionParameters: VpnConnection,
      options?: VpnConnectionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        gatewayName,
        connectionName,
        vpnConnectionParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      connectionName: string,
      vpnConnectionParameters: VpnConnection,
      options?: VpnConnectionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        gatewayName,
        connectionName,
        vpnConnectionParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      gatewayName: string,
      connectionName: string,
      options?: VpnConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, gatewayName, connectionName, options),
  };
}

export function _getVpnConnectionsOperations(
  context: NetworkManagementContext,
): VpnConnectionsOperations {
  return {
    ..._getVpnConnections(context),
  };
}
