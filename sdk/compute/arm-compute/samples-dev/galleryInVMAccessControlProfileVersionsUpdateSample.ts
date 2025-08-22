// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update a gallery inVMAccessControlProfile version.
 *
 * @summary Update a gallery inVMAccessControlProfile version.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2024-03-03/examples/galleryResourceProfileExamples/GalleryInVMAccessControlProfileVersion_Update.json
 */

import {
  GalleryInVMAccessControlProfileVersionUpdate,
  ComputeManagementClient,
} from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateAGalleryInVMAccessControlProfileVersion(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const galleryName = "myGalleryName";
  const inVMAccessControlProfileName = "myInVMAccessControlProfileName";
  const inVMAccessControlProfileVersionName = "1.0.0";
  const galleryInVMAccessControlProfileVersion: GalleryInVMAccessControlProfileVersionUpdate =
    {
      defaultAccess: "Allow",
      excludeFromLatest: false,
      mode: "Audit",
      targetLocations: [
        { name: "West US" },
        { name: "South Central US" },
        { name: "East US" },
      ],
    };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result =
    await client.galleryInVMAccessControlProfileVersions.beginUpdateAndWait(
      resourceGroupName,
      galleryName,
      inVMAccessControlProfileName,
      inVMAccessControlProfileVersionName,
      galleryInVMAccessControlProfileVersion,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAGalleryInVMAccessControlProfileVersion();
}

main().catch(console.error);
