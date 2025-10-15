// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-gallery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a gallery inVMAccessControlProfile version.
 *
 * @summary update a gallery inVMAccessControlProfile version.
 * x-ms-original-file: 2024-03-03/galleryResourceProfileExamples/GalleryInVMAccessControlProfileVersion_Update.json
 */
async function updateAGalleryInVMAccessControlProfileVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
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

async function main() {
  await updateAGalleryInVMAccessControlProfileVersion();
}

main().catch(console.error);
