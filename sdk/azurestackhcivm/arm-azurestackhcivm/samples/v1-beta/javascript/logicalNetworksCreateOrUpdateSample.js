// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIVMManagementClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to create or update a logical network. Please note some properties can be set only during logical network creation.
 *
 * @summary the operation to create or update a logical network. Please note some properties can be set only during logical network creation.
 * x-ms-original-file: 2025-06-01-preview/LogicalNetworks_CreateOrUpdate.json
 */
async function putLogicalNetwork() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.logicalNetworks.createOrUpdate("test-rg", "test-lnet", {
    extendedLocation: {
      name: "/subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/dogfoodarc/providers/Microsoft.ExtendedLocation/customLocations/dogfood-location",
      type: "CustomLocation",
    },
    location: "West US2",
  });
  console.log(result);
}

async function main() {
  await putLogicalNetwork();
}

main().catch(console.error);
