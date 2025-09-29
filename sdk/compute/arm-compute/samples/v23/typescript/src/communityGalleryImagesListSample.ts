// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List community gallery images inside a gallery.
 *
 * @summary List community gallery images inside a gallery.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2024-03-03/examples/communityGalleryExamples/CommunityGalleryImage_List.json
 */
async function listCommunityGalleryImages(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const location = "myLocation";
  const publicGalleryName = "publicGalleryName";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.communityGalleryImages.list(
    location,
    publicGalleryName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listCommunityGalleryImages();
}

main().catch(console.error);
