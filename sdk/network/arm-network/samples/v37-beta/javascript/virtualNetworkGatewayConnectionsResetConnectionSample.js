// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to resets the virtual network gateway connection specified.
 *
 * @summary resets the virtual network gateway connection specified.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayConnectionReset.json
 */
async function resetVirtualNetworkGatewayConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.virtualNetworkGatewayConnections.resetConnection("rg1", "conn1");
}

async function main() {
  await resetVirtualNetworkGatewayConnection();
}

main().catch(console.error);
