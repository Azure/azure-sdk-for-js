// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIVMManagementClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to create or update a virtual network. Please note some properties can be set only during virtualNetwork network creation.
 *
 * @summary the operation to create or update a virtual network. Please note some properties can be set only during virtualNetwork network creation.
 * x-ms-original-file: 2026-04-01-preview/VirtualNetworks_CreateOrUpdate.json
 */
async function putVirtualNetwork() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworks.createOrUpdate("test-rg", "test-vnet", {
    extendedLocation: {
      name: "/subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/dogfoodarc/providers/Microsoft.ExtendedLocation/customLocations/dogfood-location",
      type: "CustomLocation",
    },
    properties: {
      addressSpace: { addressPrefixes: ["10.0.0.0/24"] },
      dhcpOptions: { dnsServers: [] },
    },
    location: "West US2",
  });
  console.log(result);
}

async function main() {
  await putVirtualNetwork();
}

main().catch(console.error);
