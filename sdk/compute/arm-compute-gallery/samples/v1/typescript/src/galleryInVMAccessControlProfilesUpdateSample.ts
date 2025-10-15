// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a gallery inVMAccessControlProfile.
 *
 * @summary update a gallery inVMAccessControlProfile.
 * x-ms-original-file: 2024-03-03/galleryResourceProfileExamples/GalleryInVMAccessControlProfile_Update.json
 */
async function updateAGalleryInVMAccessControlProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.galleryInVMAccessControlProfiles.update(
    "myResourceGroup",
    "myGalleryName",
    "myInVMAccessControlProfileName",
    { properties: { osType: "Linux", applicableHostEndpoint: "WireServer" } },
  );
}

async function main(): Promise<void> {
  await updateAGalleryInVMAccessControlProfile();
}

main().catch(console.error);
