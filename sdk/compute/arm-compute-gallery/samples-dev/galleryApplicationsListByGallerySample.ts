// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list gallery Application Definitions in a gallery.
 *
 * @summary list gallery Application Definitions in a gallery.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryApplication_ListByGallery.json
 */
async function listGalleryApplicationsInAGallery(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.galleryApplications.listByGallery(
    "myResourceGroup",
    "myGalleryName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listGalleryApplicationsInAGallery();
}

main().catch(console.error);
