// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a gallery image
 *
 * @summary gets a gallery image
 * x-ms-original-file: 2025-06-01-preview/GalleryImages_Get.json
 */
async function getGalleryImage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.galleryImages.get("test-rg", "test-gallery-image");
  console.log(result);
}

async function main() {
  await getGalleryImage();
}

main().catch(console.error);
