// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create or update a storage container. Please note some properties can be set only during storage container creation.
 *
 * @summary the operation to create or update a storage container. Please note some properties can be set only during storage container creation.
 * x-ms-original-file: 2025-06-01-preview/StorageContainers_CreateOrUpdate.json
 */
async function putStorageContainer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.storageContainers.createOrUpdate("test-rg", "Default_Container", {
    extendedLocation: {
      name: "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.ExtendedLocation/customLocations/dogfood-location",
      type: "CustomLocation",
    },
    location: "West US2",
    properties: { path: "C:\\container_storage" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putStorageContainer();
}

main().catch(console.error);
