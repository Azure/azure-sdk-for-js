// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified virtual network gateway by resource group.
 *
 * @summary gets the specified virtual network gateway by resource group.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayGet.json
 */
async function getVirtualNetworkGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.get("rg1", "vpngw");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified virtual network gateway by resource group.
 *
 * @summary gets the specified virtual network gateway by resource group.
 * x-ms-original-file: 2025-05-01/VirtualNetworkScalableGatewayGet.json
 */
async function getVirtualNetworkScalableGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.get("rg1", "ergw");
  console.log(result);
}

async function main() {
  await getVirtualNetworkGateway();
  await getVirtualNetworkScalableGateway();
}

main().catch(console.error);
