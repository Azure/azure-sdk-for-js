// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-gallery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a gallery image definition.
 *
 * @summary create or update a gallery image definition.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImage_Create.json
 */
async function createOrUpdateASimpleGalleryImage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.galleryImages.createOrUpdate(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
    {
      location: "West US",
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
    },
  );
}

async function main() {
  await createOrUpdateASimpleGalleryImage();
}

main().catch(console.error);
