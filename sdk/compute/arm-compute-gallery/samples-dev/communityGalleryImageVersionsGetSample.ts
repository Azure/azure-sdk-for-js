// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a community gallery image version.
 *
 * @summary get a community gallery image version.
 * x-ms-original-file: 2024-03-03/communityGalleryExamples/CommunityGalleryImageVersion_Get.json
 */
async function getACommunityGalleryImageVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.communityGalleryImageVersions.get(
    "myLocation",
    "publicGalleryName",
    "myGalleryImageName",
    "myGalleryImageVersionName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getACommunityGalleryImageVersion();
}

main().catch(console.error);
