// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-gallery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a shared gallery image by subscription id or tenant id.
 *
 * @summary get a shared gallery image by subscription id or tenant id.
 * x-ms-original-file: 2024-03-03/sharedGalleryExamples/SharedGalleryImage_Get.json
 */
async function getASharedGalleryImage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.sharedGalleryImages.get(
    "myLocation",
    "galleryUniqueName",
    "myGalleryImageName",
  );
  console.log(result);
}

async function main() {
  await getASharedGalleryImage();
}

main().catch(console.error);
