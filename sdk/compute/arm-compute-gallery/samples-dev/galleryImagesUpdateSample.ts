// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a gallery image definition.
 *
 * @summary update a gallery image definition.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImage_Update.json
 */
async function updateASimpleGalleryImage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.galleryImages.update("myResourceGroup", "myGalleryName", "myGalleryImageName", {
    properties: {
      osType: "Windows",
      osState: "Generalized",
      hyperVGeneration: "V1",
      identifier: {
        publisher: "myPublisherName",
        offer: "myOfferName",
        sku: "mySkuName",
      },
    },
  });
}

/**
 * This sample demonstrates how to update a gallery image definition.
 *
 * @summary update a gallery image definition.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImage_UpdateFeatures.json
 */
async function updateAGalleryImageFeature(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.galleryImages.update("myResourceGroup", "myGalleryName", "myGalleryImageName", {
    properties: {
      osType: "Windows",
      osState: "Generalized",
      hyperVGeneration: "V2",
      allowUpdateImage: true,
      features: [
        {
          name: "SecurityType",
          value: "TrustedLaunch",
          startsAtVersion: "2.0.0",
        },
      ],
      identifier: {
        publisher: "myPublisherName",
        offer: "myOfferName",
        sku: "mySkuName",
      },
    },
  });
}

async function main(): Promise<void> {
  await updateASimpleGalleryImage();
  await updateAGalleryImageFeature();
}

main().catch(console.error);
