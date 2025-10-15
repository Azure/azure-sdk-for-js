// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Shared Image Gallery.
 *
 * @summary update a Shared Image Gallery.
 * x-ms-original-file: 2024-03-03/galleryExamples/Gallery_Update.json
 */
async function updateASimpleGallery(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.galleries.update("myResourceGroup", "myGalleryName", {
    properties: { description: "This is the gallery description." },
  });
}

async function main(): Promise<void> {
  await updateASimpleGallery();
}

main().catch(console.error);
