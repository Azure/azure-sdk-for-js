// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a gallery image definition.
 *
 * @summary create or update a gallery image definition.
 * x-ms-original-file: 2025-03-03/galleryExamples/GalleryImage_Create.json
 */
async function createOrUpdateASimpleGalleryImage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleryImages.createOrUpdate(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
    {
      location: "West US",
      osType: "Windows",
      osState: "Generalized",
      hyperVGeneration: "V1",
      identifier: { publisher: "myPublisherName", offer: "myOfferName", sku: "mySkuName" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateASimpleGalleryImage();
}

main().catch(console.error);
