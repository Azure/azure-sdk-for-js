// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to gets a gallery image
 *
 * @summary gets a gallery image
 * x-ms-original-file: 2025-06-01-preview/GalleryImages_Get.json
 */

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

async function getGalleryImage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.galleryImages.get("test-rg", "test-gallery-image");
  console.log(result);
}

async function main(): Promise<void> {
  await getGalleryImage();
}

main().catch(console.error);
