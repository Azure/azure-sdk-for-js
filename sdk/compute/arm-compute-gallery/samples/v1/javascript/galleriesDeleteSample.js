// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-gallery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Shared Image Gallery.
 *
 * @summary delete a Shared Image Gallery.
 * x-ms-original-file: 2024-03-03/galleryExamples/Gallery_Delete.json
 */
async function deleteAGallery() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.galleries.delete("myResourceGroup", "myGalleryName");
}

async function main() {
  await deleteAGallery();
}

main().catch(console.error);
