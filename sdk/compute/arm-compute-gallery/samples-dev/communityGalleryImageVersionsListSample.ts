// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list community gallery image versions inside an image.
 *
 * @summary list community gallery image versions inside an image.
 * x-ms-original-file: 2024-03-03/communityGalleryExamples/CommunityGalleryImageVersion_List.json
 */
async function listCommunityGalleryImageVersions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.communityGalleryImageVersions.list(
    "myLocation",
    "publicGalleryName",
    "myGalleryImageName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listCommunityGalleryImageVersions();
}

main().catch(console.error);
