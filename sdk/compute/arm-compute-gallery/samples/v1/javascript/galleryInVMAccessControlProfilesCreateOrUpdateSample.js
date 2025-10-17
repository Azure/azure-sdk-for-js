// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-gallery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a gallery inVMAccessControlProfile.
 *
 * @summary create or update a gallery inVMAccessControlProfile.
 * x-ms-original-file: 2024-03-03/galleryResourceProfileExamples/GalleryInVMAccessControlProfile_Create.json
 */
async function createOrUpdateAGalleryInVMAccessControlProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
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

async function main() {
  await createOrUpdateAGalleryInVMAccessControlProfile();
}

main().catch(console.error);
