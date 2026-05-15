// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all the connections in a virtual network gateway.
 *
 * @summary gets all the connections in a virtual network gateway.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewaysListConnections.json
 */
async function virtualNetworkGatewaysListConnections() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualNetworkGateways.listConnections(
    "testrg",
    "test-vpn-gateway-1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await virtualNetworkGatewaysListConnections();
}

main().catch(console.error);
