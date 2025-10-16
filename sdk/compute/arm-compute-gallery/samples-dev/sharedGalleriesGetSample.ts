// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a shared gallery by subscription id or tenant id.
 *
 * @summary get a shared gallery by subscription id or tenant id.
 * x-ms-original-file: 2024-03-03/sharedGalleryExamples/SharedGallery_Get.json
 */
async function getASharedGallery(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.sharedGalleries.get("myLocation", "galleryUniqueName");
  console.log(result);
}

async function main(): Promise<void> {
  await getASharedGallery();
}

main().catch(console.error);
