// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves information about a gallery Application Version.
 *
 * @summary retrieves information about a gallery Application Version.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryApplicationVersion_Get.json
 */
async function getAGalleryApplicationVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.galleryApplicationVersions.get(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryApplicationName",
    "1.0.0",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to retrieves information about a gallery Application Version.
 *
 * @summary retrieves information about a gallery Application Version.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryApplicationVersion_Get_WithReplicationStatus.json
 */
async function getAGalleryApplicationVersionWithReplicationStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.galleryApplicationVersions.get(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryApplicationName",
    "1.0.0",
    { expand: "ReplicationStatus" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAGalleryApplicationVersion();
  await getAGalleryApplicationVersionWithReplicationStatus();
}

main().catch(console.error);
