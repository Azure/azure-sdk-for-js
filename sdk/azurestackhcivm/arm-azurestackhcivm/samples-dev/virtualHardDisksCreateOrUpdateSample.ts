// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create or update a virtual hard disk. Please note some properties can be set only during virtual hard disk creation.
 *
 * @summary the operation to create or update a virtual hard disk. Please note some properties can be set only during virtual hard disk creation.
 * x-ms-original-file: 2025-06-01-preview/VirtualHardDisks_CreateOrUpdate.json
 */
async function putVirtualHardDisk(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.virtualHardDisks.createOrUpdate("test-rg", "test-vhd", {
    extendedLocation: {
      name: "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.ExtendedLocation/customLocations/dogfood-location",
      type: "CustomLocation",
    },
    location: "West US2",
    properties: { diskSizeGB: 32 },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a virtual hard disk. Please note some properties can be set only during virtual hard disk creation.
 *
 * @summary the operation to create or update a virtual hard disk. Please note some properties can be set only during virtual hard disk creation.
 * x-ms-original-file: 2025-06-01-preview/VirtualHardDisks__CreateOrUpdate_CreateFromLocal.json
 */
async function createVirtualHardDiskFromLocal(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.virtualHardDisks.createOrUpdate("test-rg", "test-vhd", {
    extendedLocation: {
      name: "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.ExtendedLocation/customLocations/dogfood-location",
      type: "CustomLocation",
    },
    location: "West US2",
    properties: {
      createFromLocal: true,
      containerId:
        "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.AzureStackHCI/storageContainers/test-storage-container",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putVirtualHardDisk();
  await createVirtualHardDiskFromLocal();
}

main().catch(console.error);
