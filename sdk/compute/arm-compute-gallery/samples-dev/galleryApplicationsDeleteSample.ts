// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a gallery Application.
 *
 * @summary delete a gallery Application.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryApplication_Delete.json
 */
async function deleteAGalleryApplication(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.galleryApplications.delete(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryApplicationName",
  );
}

async function main(): Promise<void> {
  await deleteAGalleryApplication();
}

main().catch(console.error);
