// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Delete a gallery Script Version.
 *
 * @summary Delete a gallery Script Version.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2025-03-03/examples/galleryScriptExamples/GalleryScriptVersion_Delete.json
 */
async function deleteAGalleryScriptVersion(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroupName";
  const galleryName = "myGalleryName";
  const galleryScriptName = "myGalleryScriptName";
  const galleryScriptVersionName = "1.0.0";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleryScriptVersions.beginDeleteAndWait(
    resourceGroupName,
    galleryName,
    galleryScriptName,
    galleryScriptVersionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAGalleryScriptVersion();
}

main().catch(console.error);
