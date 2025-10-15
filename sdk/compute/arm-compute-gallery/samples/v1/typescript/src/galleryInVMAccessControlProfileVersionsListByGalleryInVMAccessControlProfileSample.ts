// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list gallery inVMAccessControlProfile versions in a gallery inVMAccessControlProfile
 *
 * @summary list gallery inVMAccessControlProfile versions in a gallery inVMAccessControlProfile
 * x-ms-original-file: 2024-03-03/galleryResourceProfileExamples/GalleryInVMAccessControlProfileVersion_ListByGalleryInVMAccessControlProfile.json
 */
async function listGalleryInVMAccessControlProfileVersionsInAGalleryInVMAccessControlProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.galleryInVMAccessControlProfileVersions.listByGalleryInVMAccessControlProfile(
    "myResourceGroup",
    "myGalleryName",
    "myInVMAccessControlProfileName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listGalleryInVMAccessControlProfileVersionsInAGalleryInVMAccessControlProfile();
}

main().catch(console.error);
