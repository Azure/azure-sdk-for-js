// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves information about a gallery image definition.
 *
 * @summary retrieves information about a gallery image definition.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImage_Get.json
 */
async function getAGalleryImage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleryImages.get(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAGalleryImage();
}

main().catch(console.error);
