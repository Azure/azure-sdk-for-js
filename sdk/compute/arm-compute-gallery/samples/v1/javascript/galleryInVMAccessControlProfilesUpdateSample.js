// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-gallery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a gallery inVMAccessControlProfile.
 *
 * @summary update a gallery inVMAccessControlProfile.
 * x-ms-original-file: 2024-03-03/galleryResourceProfileExamples/GalleryInVMAccessControlProfile_Update.json
 */
async function updateAGalleryInVMAccessControlProfile() {
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

async function main() {
  await updateAGalleryInVMAccessControlProfile();
}

main().catch(console.error);
