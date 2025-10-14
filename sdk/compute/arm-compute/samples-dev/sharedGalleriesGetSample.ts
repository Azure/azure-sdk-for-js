// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get a shared gallery by subscription id or tenant id.
 *
 * @summary Get a shared gallery by subscription id or tenant id.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2024-03-03/examples/sharedGalleryExamples/SharedGallery_Get.json
 */
async function getASharedGallery(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const location = "myLocation";
  const galleryUniqueName = "galleryUniqueName";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.sharedGalleries.get(location, galleryUniqueName);
  console.log(result);
}

async function main(): Promise<void> {
  await getASharedGallery();
}

main().catch(console.error);
