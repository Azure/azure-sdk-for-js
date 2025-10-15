// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a gallery inVMAccessControlProfile.
 *
 * @summary delete a gallery inVMAccessControlProfile.
 * x-ms-original-file: 2024-03-03/galleryResourceProfileExamples/GalleryInVMAccessControlProfile_Delete.json
 */
async function deleteAGalleryInVMAccessControlProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.galleryInVMAccessControlProfiles.delete(
    "myResourceGroup",
    "myGalleryName",
    "myInVMAccessControlProfileName",
  );
}

async function main(): Promise<void> {
  await deleteAGalleryInVMAccessControlProfile();
}

main().catch(console.error);
