// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a gallery inVMAccessControlProfile.
 *
 * @summary delete a gallery inVMAccessControlProfile.
 * x-ms-original-file: 2025-03-03/galleryResourceProfileExamples/GalleryInVMAccessControlProfile_Delete.json
 */
async function deleteAGalleryInVMAccessControlProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.galleryInVMAccessControlProfiles.delete(
    "myResourceGroup",
    "myGalleryName",
    "myInVMAccessControlProfileName",
  );
}

async function main() {
  await deleteAGalleryInVMAccessControlProfile();
}

main().catch(console.error);
