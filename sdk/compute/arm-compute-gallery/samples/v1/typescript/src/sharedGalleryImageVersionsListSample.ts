// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list shared gallery image versions by subscription id or tenant id.
 *
 * @summary list shared gallery image versions by subscription id or tenant id.
 * x-ms-original-file: 2024-03-03/sharedGalleryExamples/SharedGalleryImageVersions_List.json
 */
async function listSharedGalleryImageVersions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sharedGalleryImageVersions.list(
    "myLocation",
    "galleryUniqueName",
    "myGalleryImageName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listSharedGalleryImageVersions();
}

main().catch(console.error);
