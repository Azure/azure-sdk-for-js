// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIVMManagementClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to create or update a virtual network subnet.
 *
 * @summary the operation to create or update a virtual network subnet.
 * x-ms-original-file: 2026-04-01-preview/VirtualNetworkSubnets_CreateOrUpdate.json
 */
async function putVirtualNetworkSubnet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkSubnets.createOrUpdate(
    "test-rg",
    "test-vnet",
    "subnet1",
    { properties: { addressPrefix: "10.0.0.0/28" } },
  );
  console.log(result);
}

async function main() {
  await putVirtualNetworkSubnet();
}

main().catch(console.error);
