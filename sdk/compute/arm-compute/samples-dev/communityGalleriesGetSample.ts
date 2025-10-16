// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get a community gallery by gallery public name.
 *
 * @summary Get a community gallery by gallery public name.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2024-03-03/examples/communityGalleryExamples/CommunityGallery_Get.json
 */
async function getACommunityGallery(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const location = "myLocation";
  const publicGalleryName = "publicGalleryName";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.communityGalleries.get(
    location,
    publicGalleryName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getACommunityGallery();
}

main().catch(console.error);
