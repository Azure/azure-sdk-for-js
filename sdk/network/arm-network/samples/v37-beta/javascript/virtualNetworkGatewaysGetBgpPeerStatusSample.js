// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the GetBgpPeerStatus operation retrieves the status of all BGP peers.
 *
 * @summary the GetBgpPeerStatus operation retrieves the status of all BGP peers.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayGetBGPPeerStatus.json
 */
async function getVirtualNetworkGatewayBGPPeerStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.getBgpPeerStatus("rg1", "vpngw");
  console.log(result);
}

async function main() {
  await getVirtualNetworkGatewayBGPPeerStatus();
}

main().catch(console.error);
