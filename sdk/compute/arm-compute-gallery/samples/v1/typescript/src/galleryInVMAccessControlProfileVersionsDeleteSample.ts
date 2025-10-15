// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a gallery inVMAccessControlProfile version.
 *
 * @summary delete a gallery inVMAccessControlProfile version.
 * x-ms-original-file: 2024-03-03/galleryResourceProfileExamples/GalleryInVMAccessControlProfileVersion_Delete.json
 */
async function deleteAGalleryInVMAccessControlProfileVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.galleryInVMAccessControlProfileVersions.delete(
    "myResourceGroup",
    "myGalleryName",
    "myInVMAccessControlProfileName",
    "1.0.0",
  );
}

async function main(): Promise<void> {
  await deleteAGalleryInVMAccessControlProfileVersion();
}

main().catch(console.error);
