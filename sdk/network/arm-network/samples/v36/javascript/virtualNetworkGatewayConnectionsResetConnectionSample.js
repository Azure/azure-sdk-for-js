// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Resets the virtual network gateway connection specified.
 *
 * @summary Resets the virtual network gateway connection specified.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkGatewayConnectionReset.json
 */
async function resetVirtualNetworkGatewayConnection() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkGatewayConnectionName = "conn1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGatewayConnections.beginResetConnectionAndWait(
    resourceGroupName,
    virtualNetworkGatewayConnectionName,
  );
  console.log(result);
}

async function main() {
  await resetVirtualNetworkGatewayConnection();
}

main().catch(console.error);
