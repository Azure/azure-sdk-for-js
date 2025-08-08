// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to update a gallery image.
 *
 * @summary the operation to update a gallery image.
 * x-ms-original-file: 2025-06-01-preview/GalleryImages_Update.json
 */
async function updateGalleryImage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.galleryImages.update("test-rg", "test-gallery-image", {
    tags: { additionalProperties: "sample" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateGalleryImage();
}

main().catch(console.error);
