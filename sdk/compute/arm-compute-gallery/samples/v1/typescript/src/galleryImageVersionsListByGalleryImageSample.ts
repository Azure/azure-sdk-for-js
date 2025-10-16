// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list gallery image versions in a gallery image definition.
 *
 * @summary list gallery image versions in a gallery image definition.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImageVersion_ListByGalleryImage.json
 */
async function listGalleryImageVersionsInAGalleryImageDefinition(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.galleryImageVersions.listByGalleryImage(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listGalleryImageVersionsInAGalleryImageDefinition();
}

main().catch(console.error);
