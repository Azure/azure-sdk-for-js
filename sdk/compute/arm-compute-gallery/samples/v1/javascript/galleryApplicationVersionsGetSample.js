// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-gallery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves information about a gallery Application Version.
 *
 * @summary retrieves information about a gallery Application Version.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryApplicationVersion_Get.json
 */
async function getAGalleryApplicationVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
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
async function getAGalleryApplicationVersionWithReplicationStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleryApplicationVersions.get(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryApplicationName",
    "1.0.0",
    { expand: "ReplicationStatus" },
  );
  console.log(result);
}

async function main() {
  await getAGalleryApplicationVersion();
  await getAGalleryApplicationVersionWithReplicationStatus();
}

main().catch(console.error);
