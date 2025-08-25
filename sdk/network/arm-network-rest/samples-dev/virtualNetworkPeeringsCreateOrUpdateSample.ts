// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a peering in the specified virtual network.
 *
 * @summary Creates or updates a peering in the specified virtual network.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualNetworkPeeringCreate.json
 */

import type { VirtualNetworkPeeringsCreateOrUpdateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createPeering(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "peerTest";
  const virtualNetworkName = "vnet1";
  const virtualNetworkPeeringName = "peer";
  const options: VirtualNetworkPeeringsCreateOrUpdateParameters = {
    body: {
      properties: {
        allowForwardedTraffic: true,
        allowGatewayTransit: false,
        allowVirtualNetworkAccess: true,
        remoteVirtualNetwork: {
          id: "/subscriptions/subid/resourceGroups/peerTest/providers/Microsoft.Network/virtualNetworks/vnet2",
        },
        useRemoteGateways: false,
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/virtualNetworkPeerings/{virtualNetworkPeeringName}",
      subscriptionId,
      resourceGroupName,
      virtualNetworkName,
      virtualNetworkPeeringName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createPeering().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates a peering in the specified virtual network.
 *
 * @summary Creates or updates a peering in the specified virtual network.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualNetworkPeeringCreateWithRemoteVirtualNetworkEncryption.json
 */
async function createPeeringWithRemoteVirtualNetworkEncryption(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "peerTest";
  const virtualNetworkName = "vnet1";
  const virtualNetworkPeeringName = "peer";
  const options: VirtualNetworkPeeringsCreateOrUpdateParameters = {
    body: {
      properties: {
        allowForwardedTraffic: true,
        allowGatewayTransit: false,
        allowVirtualNetworkAccess: true,
        remoteVirtualNetwork: {
          id: "/subscriptions/subid/resourceGroups/peerTest/providers/Microsoft.Network/virtualNetworks/vnet2",
        },
        useRemoteGateways: false,
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/virtualNetworkPeerings/{virtualNetworkPeeringName}",
      subscriptionId,
      resourceGroupName,
      virtualNetworkName,
      virtualNetworkPeeringName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createPeeringWithRemoteVirtualNetworkEncryption().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates a peering in the specified virtual network.
 *
 * @summary Creates or updates a peering in the specified virtual network.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualNetworkPeeringSync.json
 */
async function syncPeering(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "peerTest";
  const virtualNetworkName = "vnet1";
  const virtualNetworkPeeringName = "peer";
  const options: VirtualNetworkPeeringsCreateOrUpdateParameters = {
    body: {
      properties: {
        allowForwardedTraffic: true,
        allowGatewayTransit: false,
        allowVirtualNetworkAccess: true,
        remoteVirtualNetwork: {
          id: "/subscriptions/subid/resourceGroups/peerTest/providers/Microsoft.Network/virtualNetworks/vnet2",
        },
        useRemoteGateways: false,
      },
    },
    queryParameters: {
      syncRemoteAddressSpace: "true",
      "api-version": "2022-05-01",
    },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/virtualNetworkPeerings/{virtualNetworkPeeringName}",
      subscriptionId,
      resourceGroupName,
      virtualNetworkName,
      virtualNetworkPeeringName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

syncPeering().catch(console.error);
