// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-gallery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a gallery image.
 *
 * @summary delete a gallery image.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImage_Delete.json
 */
async function deleteAGalleryImage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.galleryImages.delete("myResourceGroup", "myGalleryName", "myGalleryImageName");
}

async function main() {
  await deleteAGalleryImage();
}

main().catch(console.error);
