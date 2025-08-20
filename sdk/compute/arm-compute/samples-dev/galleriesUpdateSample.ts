// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update a Shared Image Gallery.
 *
 * @summary Update a Shared Image Gallery.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2024-03-03/examples/galleryExamples/Gallery_Update.json
 */

import { GalleryUpdate, ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateASimpleGallery(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const galleryName = "myGalleryName";
  const gallery: GalleryUpdate = {
    description: "This is the gallery description.",
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleries.beginUpdateAndWait(
    resourceGroupName,
    galleryName,
    gallery,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateASimpleGallery();
}

main().catch(console.error);
