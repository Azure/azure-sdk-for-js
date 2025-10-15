// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Shared Image Gallery.
 *
 * @summary delete a Shared Image Gallery.
 * x-ms-original-file: 2024-03-03/galleryExamples/Gallery_Delete.json
 */
async function deleteAGallery(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.galleries.delete("myResourceGroup", "myGalleryName");
}

async function main(): Promise<void> {
  await deleteAGallery();
}

main().catch(console.error);
