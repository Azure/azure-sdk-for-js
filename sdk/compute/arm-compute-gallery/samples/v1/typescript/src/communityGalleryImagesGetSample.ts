// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a community gallery image.
 *
 * @summary get a community gallery image.
 * x-ms-original-file: 2024-03-03/communityGalleryExamples/CommunityGalleryImage_Get.json
 */
async function getACommunityGalleryImage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.communityGalleryImages.get(
    "myLocation",
    "publicGalleryName",
    "myGalleryImageName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getACommunityGalleryImage();
}

main().catch(console.error);
