// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-gallery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Shared Image Gallery.
 *
 * @summary update a Shared Image Gallery.
 * x-ms-original-file: 2024-03-03/galleryExamples/Gallery_Update.json
 */
async function updateASimpleGallery() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.galleries.update("myResourceGroup", "myGalleryName", {
    properties: { description: "This is the gallery description." },
  });
}

async function main() {
  await updateASimpleGallery();
}

main().catch(console.error);
