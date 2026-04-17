// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a gallery Script Version.
 *
 * @summary delete a gallery Script Version.
 * x-ms-original-file: 2025-03-03/galleryScriptExamples/GalleryScriptVersion_Delete.json
 */
async function deleteAGalleryScriptVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.galleryScriptVersions.delete(
    "myResourceGroupName",
    "myGalleryName",
    "myGalleryScriptName",
    "1.0.0",
  );
}

async function main(): Promise<void> {
  await deleteAGalleryScriptVersion();
}

main().catch(console.error);
