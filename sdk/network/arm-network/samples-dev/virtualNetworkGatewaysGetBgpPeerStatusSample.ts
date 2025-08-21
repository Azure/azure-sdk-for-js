// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The GetBgpPeerStatus operation retrieves the status of all BGP peers.
 *
 * @summary The GetBgpPeerStatus operation retrieves the status of all BGP peers.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/VirtualNetworkGatewayGetBGPPeerStatus.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getVirtualNetworkGatewayBgpPeerStatus(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkGatewayName = "vpngw";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.virtualNetworkGateways.beginGetBgpPeerStatusAndWait(
      resourceGroupName,
      virtualNetworkGatewayName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await getVirtualNetworkGatewayBgpPeerStatus();
}

main().catch(console.error);
