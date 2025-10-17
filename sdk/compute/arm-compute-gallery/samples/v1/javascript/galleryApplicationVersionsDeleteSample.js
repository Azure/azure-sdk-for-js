// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-gallery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a gallery Application Version.
 *
 * @summary delete a gallery Application Version.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryApplicationVersion_Delete.json
 */
async function deleteAGalleryApplicationVersion() {
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

async function main() {
  await deleteAGalleryApplicationVersion();
}

main().catch(console.error);
