// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a gallery inVMAccessControlProfile.
 *
 * @summary create or update a gallery inVMAccessControlProfile.
 * x-ms-original-file: 2025-03-03/galleryResourceProfileExamples/GalleryInVMAccessControlProfile_Create.json
 */
async function createOrUpdateAGalleryInVMAccessControlProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.galleryInVMAccessControlProfiles.createOrUpdate(
    "myResourceGroup",
    "myGalleryName",
    "myInVMAccessControlProfileName",
    { location: "West US", properties: { osType: "Linux", applicableHostEndpoint: "WireServer" } },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAGalleryInVMAccessControlProfile();
}

main().catch(console.error);
