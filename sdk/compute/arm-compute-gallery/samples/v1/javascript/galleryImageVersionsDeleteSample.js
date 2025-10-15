// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-gallery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a gallery image version.
 *
 * @summary delete a gallery image version.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImageVersion_Delete.json
 */
async function deleteAGalleryImageVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.galleryImageVersions.delete(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
    "1.0.0",
  );
}

async function main() {
  await deleteAGalleryImageVersion();
}

main().catch(console.error);
