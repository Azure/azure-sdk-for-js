// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list gallery inVMAccessControlProfiles in a gallery.
 *
 * @summary list gallery inVMAccessControlProfiles in a gallery.
 * x-ms-original-file: 2024-03-03/galleryResourceProfileExamples/GalleryInVMAccessControlProfile_ListByGallery.json
 */
async function listGalleryInVMAccessControlProfilesInAGallery(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.galleryInVMAccessControlProfiles.listByGallery(
    "myResourceGroup",
    "myGalleryName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listGalleryInVMAccessControlProfilesInAGallery();
}

main().catch(console.error);
