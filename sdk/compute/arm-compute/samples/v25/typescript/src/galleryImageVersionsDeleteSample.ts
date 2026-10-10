// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a gallery image version.
 *
 * @summary delete a gallery image version.
 * x-ms-original-file: 2026-03-03/galleryExamples/GalleryImageVersion_Delete.json
 */
async function deleteAGalleryImageVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.galleryImageVersions.delete(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
    "1.0.0",
  );
}

/**
 * This sample demonstrates how to delete a gallery image version.
 *
 * @summary delete a gallery image version.
 * x-ms-original-file: 2026-03-03/galleryExamples/GalleryImageVersion_Delete_BypassSoftDelete.json
 */
async function permanentlyDeleteAGalleryImageVersionByBypassingSoftDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.galleryImageVersions.delete(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
    "1.0.0",
    { bypassSoftDelete: true },
  );
}

async function main(): Promise<void> {
  await deleteAGalleryImageVersion();
  await permanentlyDeleteAGalleryImageVersionByBypassingSoftDelete();
}

main().catch(console.error);
