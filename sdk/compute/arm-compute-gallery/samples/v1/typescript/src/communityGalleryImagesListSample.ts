// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list community gallery images inside a gallery.
 *
 * @summary list community gallery images inside a gallery.
 * x-ms-original-file: 2024-03-03/communityGalleryExamples/CommunityGalleryImage_List.json
 */
async function listCommunityGalleryImages(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.communityGalleryImages.list("myLocation", "publicGalleryName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listCommunityGalleryImages();
}

main().catch(console.error);
