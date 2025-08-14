// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create or update a gallery image. Please note some properties can be set only during gallery image creation.
 *
 * @summary the operation to create or update a gallery image. Please note some properties can be set only during gallery image creation.
 * x-ms-original-file: 2025-06-01-preview/GalleryImages_CreateOrUpdate.json
 */
async function putGalleryImage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.galleryImages.createOrUpdate("test-rg", "test-gallery-image", {
    extendedLocation: {
      name: "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.ExtendedLocation/customLocations/dogfood-location",
      type: "CustomLocation",
    },
    location: "West US2",
    properties: {
      containerId:
        "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.AzureStackHCI/storageContainers/test-storage-container",
      imagePath: "C:\\test.vhdx",
      osType: "Linux",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putGalleryImage();
}

main().catch(console.error);
