// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Resets the primary of the virtual network gateway in the specified resource group.
 *
 * @summary Resets the primary of the virtual network gateway in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkGatewayReset.json
 */
async function resetVirtualNetworkGateway() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkGatewayName = "vpngw";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.beginResetAndWait(
    resourceGroupName,
    virtualNetworkGatewayName,
  );
  console.log(result);
}

async function main() {
  await resetVirtualNetworkGateway();
}

main().catch(console.error);
