// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update a gallery inVMAccessControlProfile.
 *
 * @summary Update a gallery inVMAccessControlProfile.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2024-03-03/examples/galleryResourceProfileExamples/GalleryInVMAccessControlProfile_Update.json
 */

import {
  GalleryInVMAccessControlProfileUpdate,
  ComputeManagementClient,
} from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateAGalleryInVMAccessControlProfile(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const galleryName = "myGalleryName";
  const inVMAccessControlProfileName = "myInVMAccessControlProfileName";
  const galleryInVMAccessControlProfile: GalleryInVMAccessControlProfileUpdate =
    { properties: { applicableHostEndpoint: "WireServer", osType: "Linux" } };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result =
    await client.galleryInVMAccessControlProfiles.beginUpdateAndWait(
      resourceGroupName,
      galleryName,
      inVMAccessControlProfileName,
      galleryInVMAccessControlProfile,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAGalleryInVMAccessControlProfile();
}

main().catch(console.error);
