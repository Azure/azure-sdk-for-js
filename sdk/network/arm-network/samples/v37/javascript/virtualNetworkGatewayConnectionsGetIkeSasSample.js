// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists IKE Security Associations for the virtual network gateway connection in the specified resource group.
 *
 * @summary lists IKE Security Associations for the virtual network gateway connection in the specified resource group.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayConnectionGetIkeSas.json
 */
async function getVirtualNetworkGatewayConnectionIkeSa() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.virtualNetworkGatewayConnections.getIkeSas("rg1", "vpngwcn1");
}

async function main() {
  await getVirtualNetworkGatewayConnectionIkeSa();
}

main().catch(console.error);
