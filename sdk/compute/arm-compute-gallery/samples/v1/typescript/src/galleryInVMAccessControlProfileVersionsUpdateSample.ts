// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a gallery inVMAccessControlProfile version.
 *
 * @summary update a gallery inVMAccessControlProfile version.
 * x-ms-original-file: 2024-03-03/galleryResourceProfileExamples/GalleryInVMAccessControlProfileVersion_Update.json
 */
async function updateAGalleryInVMAccessControlProfileVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.galleryInVMAccessControlProfileVersions.update(
    "myResourceGroup",
    "myGalleryName",
    "myInVMAccessControlProfileName",
    "1.0.0",
    {
      properties: {
        mode: "Audit",
        defaultAccess: "Allow",
        targetLocations: [{ name: "West US" }, { name: "South Central US" }, { name: "East US" }],
        excludeFromLatest: false,
      },
    },
  );
}

async function main(): Promise<void> {
  await updateAGalleryInVMAccessControlProfileVersion();
}

main().catch(console.error);
