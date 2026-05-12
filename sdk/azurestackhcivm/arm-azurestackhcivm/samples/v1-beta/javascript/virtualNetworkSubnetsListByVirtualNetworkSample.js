// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIVMManagementClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the virtual network subnets in a  virtual network.
 *
 * @summary lists all of the virtual network subnets in a  virtual network.
 * x-ms-original-file: 2026-04-01-preview/VirtualNetworkSubnets_ListByVirtualNetwork.json
 */
async function listVirtualNetworkSubnetsByVirtualNetwork() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualNetworkSubnets.listByVirtualNetwork(
    "test-rg",
    "test-vnet",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listVirtualNetworkSubnetsByVirtualNetwork();
}

main().catch(console.error);
