// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Delete a gallery inVMAccessControlProfile version.
 *
 * @summary Delete a gallery inVMAccessControlProfile version.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2024-03-03/examples/galleryResourceProfileExamples/GalleryInVMAccessControlProfileVersion_Delete.json
 */
async function deleteAGalleryInVMAccessControlProfileVersion() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const galleryName = "myGalleryName";
  const inVMAccessControlProfileName = "myInVMAccessControlProfileName";
  const inVMAccessControlProfileVersionName = "1.0.0";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleryInVMAccessControlProfileVersions.beginDeleteAndWait(
    resourceGroupName,
    galleryName,
    inVMAccessControlProfileName,
    inVMAccessControlProfileVersionName,
  );
  console.log(result);
}

async function main() {
  await deleteAGalleryInVMAccessControlProfileVersion();
}

main().catch(console.error);
