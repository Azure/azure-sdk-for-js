// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a gallery image version.
 *
 * @summary delete a gallery image version.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImageVersion_Delete.json
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

async function main(): Promise<void> {
  await deleteAGalleryImageVersion();
}

main().catch(console.error);
