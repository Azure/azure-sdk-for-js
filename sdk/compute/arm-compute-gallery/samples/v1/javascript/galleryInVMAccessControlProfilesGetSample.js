// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-gallery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves information about a gallery inVMAccessControlProfile.
 *
 * @summary retrieves information about a gallery inVMAccessControlProfile.
 * x-ms-original-file: 2024-03-03/galleryResourceProfileExamples/GalleryInVMAccessControlProfile_Get.json
 */
async function getAGalleryInVMAccessControlProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleryInVMAccessControlProfiles.get(
    "myResourceGroup",
    "myGalleryName",
    "myInVMAccessControlProfileName",
  );
  console.log(result);
}

async function main() {
  await getAGalleryInVMAccessControlProfile();
}

main().catch(console.error);
