// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a shared gallery image by subscription id or tenant id.
 *
 * @summary get a shared gallery image by subscription id or tenant id.
 * x-ms-original-file: 2024-03-03/sharedGalleryExamples/SharedGalleryImage_Get.json
 */
async function getASharedGalleryImage(): Promise<void> {
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

async function main(): Promise<void> {
  await getASharedGalleryImage();
}

main().catch(console.error);
