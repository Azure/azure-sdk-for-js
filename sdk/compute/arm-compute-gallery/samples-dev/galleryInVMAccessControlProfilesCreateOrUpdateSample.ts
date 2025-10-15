// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a gallery inVMAccessControlProfile.
 *
 * @summary create or update a gallery inVMAccessControlProfile.
 * x-ms-original-file: 2024-03-03/galleryResourceProfileExamples/GalleryInVMAccessControlProfile_Create.json
 */
async function createOrUpdateAGalleryInVMAccessControlProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.galleryInVMAccessControlProfiles.createOrUpdate(
    "myResourceGroup",
    "myGalleryName",
    "myInVMAccessControlProfileName",
    {
      location: "West US",
      properties: { osType: "Linux", applicableHostEndpoint: "WireServer" },
    },
  );
}

async function main(): Promise<void> {
  await createOrUpdateAGalleryInVMAccessControlProfile();
}

main().catch(console.error);
