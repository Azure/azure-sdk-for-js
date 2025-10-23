// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a community gallery by gallery public name.
 *
 * @summary get a community gallery by gallery public name.
 * x-ms-original-file: 2024-03-03/communityGalleryExamples/CommunityGallery_Get.json
 */
async function getACommunityGallery(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.communityGalleries.get("myLocation", "publicGalleryName");
  console.log(result);
}

async function main(): Promise<void> {
  await getACommunityGallery();
}

main().catch(console.error);
