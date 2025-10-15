// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list gallery image definitions in a gallery.
 *
 * @summary list gallery image definitions in a gallery.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImage_ListByGallery.json
 */
async function listGalleryImagesInAGallery(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.galleryImages.listByGallery("myResourceGroup", "myGalleryName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listGalleryImagesInAGallery();
}

main().catch(console.error);
