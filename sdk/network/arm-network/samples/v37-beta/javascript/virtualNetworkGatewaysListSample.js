// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all virtual network gateways by resource group.
 *
 * @summary gets all virtual network gateways by resource group.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayList.json
 */
async function listVirtualNetworkGatewaysinResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualNetworkGateways.list("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listVirtualNetworkGatewaysinResourceGroup();
}

main().catch(console.error);
