// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create or update a marketplace gallery image. Please note some properties can be set only during marketplace gallery image creation.
 *
 * @summary the operation to create or update a marketplace gallery image. Please note some properties can be set only during marketplace gallery image creation.
 * x-ms-original-file: 2025-06-01-preview/MarketplaceGalleryImages_CreateOrUpdate.json
 */
async function putMarketplaceGalleryImage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.marketplaceGalleryImages.createOrUpdate(
    "test-rg",
    "test-marketplace-gallery-image",
    {
      extendedLocation: {
        name: "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.ExtendedLocation/customLocations/dogfood-location",
        type: "CustomLocation",
      },
      location: "West US2",
      properties: {
        cloudInitDataSource: "Azure",
        containerId:
          "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.AzureStackHCI/storageContainers/test-storage-container",
        hyperVGeneration: "V1",
        identifier: {
          offer: "myOfferName",
          publisher: "myPublisherName",
          sku: "mySkuName",
        },
        osType: "Windows",
        version: { name: "1.0.0" },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putMarketplaceGalleryImage();
}

main().catch(console.error);
