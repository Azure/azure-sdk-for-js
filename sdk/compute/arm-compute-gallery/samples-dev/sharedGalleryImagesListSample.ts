// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list shared gallery images by subscription id or tenant id.
 *
 * @summary list shared gallery images by subscription id or tenant id.
 * x-ms-original-file: 2024-03-03/sharedGalleryExamples/SharedGalleryImages_List.json
 */
async function listSharedGalleryImages(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sharedGalleryImages.list("myLocation", "galleryUniqueName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listSharedGalleryImages();
}

main().catch(console.error);
