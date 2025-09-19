// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Create or update a gallery inVMAccessControlProfile.
 *
 * @summary Create or update a gallery inVMAccessControlProfile.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2024-03-03/examples/galleryResourceProfileExamples/GalleryInVMAccessControlProfile_Create.json
 */
async function createOrUpdateAGalleryInVMAccessControlProfile() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const galleryName = "myGalleryName";
  const inVMAccessControlProfileName = "myInVMAccessControlProfileName";
  const galleryInVMAccessControlProfile = {
    location: "West US",
    properties: { applicableHostEndpoint: "WireServer", osType: "Linux" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleryInVMAccessControlProfiles.beginCreateOrUpdateAndWait(
    resourceGroupName,
    galleryName,
    inVMAccessControlProfileName,
    galleryInVMAccessControlProfile,
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAGalleryInVMAccessControlProfile();
}

main().catch(console.error);
