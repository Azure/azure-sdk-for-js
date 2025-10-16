// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a gallery image.
 *
 * @summary delete a gallery image.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImage_Delete.json
 */
async function deleteAGalleryImage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.galleryImages.delete("myResourceGroup", "myGalleryName", "myGalleryImageName");
}

async function main(): Promise<void> {
  await deleteAGalleryImage();
}

main().catch(console.error);
