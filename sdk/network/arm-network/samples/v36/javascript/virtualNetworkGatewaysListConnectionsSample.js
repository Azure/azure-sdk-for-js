// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets all the connections in a virtual network gateway.
 *
 * @summary Gets all the connections in a virtual network gateway.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkGatewaysListConnections.json
 */
async function virtualNetworkGatewaysListConnections() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "testrg";
  const virtualNetworkGatewayName = "test-vpn-gateway-1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualNetworkGateways.listConnections(
    resourceGroupName,
    virtualNetworkGatewayName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await virtualNetworkGatewaysListConnections();
}

main().catch(console.error);
