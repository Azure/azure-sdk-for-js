// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the specified virtual network gateway by resource group.
 *
 * @summary Gets the specified virtual network gateway by resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkGatewayGet.json
 */
async function getVirtualNetworkGateway() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkGatewayName = "vpngw";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.get(
    resourceGroupName,
    virtualNetworkGatewayName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the specified virtual network gateway by resource group.
 *
 * @summary Gets the specified virtual network gateway by resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkScalableGatewayGet.json
 */
async function getVirtualNetworkScalableGateway() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkGatewayName = "ergw";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.get(
    resourceGroupName,
    virtualNetworkGatewayName,
  );
  console.log(result);
}

async function main() {
  await getVirtualNetworkGateway();
  await getVirtualNetworkScalableGateway();
}

main().catch(console.error);
