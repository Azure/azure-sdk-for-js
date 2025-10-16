// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a gallery Application Version.
 *
 * @summary delete a gallery Application Version.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryApplicationVersion_Delete.json
 */
async function deleteAGalleryApplicationVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.galleryApplicationVersions.delete(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryApplicationName",
    "1.0.0",
  );
}

async function main(): Promise<void> {
  await deleteAGalleryApplicationVersion();
}

main().catch(console.error);
