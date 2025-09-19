// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get a community gallery image.
 *
 * @summary Get a community gallery image.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2024-03-03/examples/communityGalleryExamples/CommunityGalleryImage_Get.json
 */
async function getACommunityGalleryImage(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const location = "myLocation";
  const publicGalleryName = "publicGalleryName";
  const galleryImageName = "myGalleryImageName";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.communityGalleryImages.get(
    location,
    publicGalleryName,
    galleryImageName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getACommunityGalleryImage();
}

main().catch(console.error);
