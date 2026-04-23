// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the specified virtual network gateway connection by resource group.
 *
 * @summary Gets the specified virtual network gateway connection by resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkGatewayConnectionGet.json
 */
async function getVirtualNetworkGatewayConnection() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkGatewayConnectionName = "connS2S";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGatewayConnections.get(
    resourceGroupName,
    virtualNetworkGatewayConnectionName,
  );
  console.log(result);
}

async function main() {
  await getVirtualNetworkGatewayConnection();
}

main().catch(console.error);
