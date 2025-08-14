// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIVMManagementClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to create or update a network interface. Please note some properties can be set only during network interface creation.
 *
 * @summary the operation to create or update a network interface. Please note some properties can be set only during network interface creation.
 * x-ms-original-file: 2025-06-01-preview/NetworkInterfaces_CreateOrUpdate.json
 */
async function putNetworkInterface() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.networkInterfaces.createOrUpdate("test-rg", "test-nic", {
    extendedLocation: {
      name: "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.ExtendedLocation/customLocations/dogfood-location",
      type: "CustomLocation",
    },
    location: "eastus",
    properties: {
      ipConfigurations: [
        {
          name: "ipconfig-sample",
          properties: {
            subnet: {
              id: "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.AzureStackHCI/logicalNetworks/test-lnet",
            },
          },
        },
      ],
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a network interface. Please note some properties can be set only during network interface creation.
 *
 * @summary the operation to create or update a network interface. Please note some properties can be set only during network interface creation.
 * x-ms-original-file: 2025-06-01-preview/NetworkInterfaces__CreateOrUpdate_CreateFromLocal.json
 */
async function createNetworkInterfaceFromLocal() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.networkInterfaces.createOrUpdate("test-rg", "test-nic", {
    extendedLocation: {
      name: "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.ExtendedLocation/customLocations/dogfood-location",
      type: "CustomLocation",
    },
    location: "eastus",
    properties: {
      ipConfigurations: [
        {
          name: "ipconfig-sample",
          properties: {
            subnet: {
              id: "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.AzureStackHCI/logicalNetworks/test-lnet",
            },
          },
        },
      ],
      createFromLocal: true,
    },
  });
  console.log(result);
}

async function main() {
  await putNetworkInterface();
  await createNetworkInterfaceFromLocal();
}

main().catch(console.error);
