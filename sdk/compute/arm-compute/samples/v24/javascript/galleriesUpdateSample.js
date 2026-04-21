// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Shared Image Gallery.
 *
 * @summary update a Shared Image Gallery.
 * x-ms-original-file: 2025-03-03/galleryExamples/Gallery_Update.json
 */
async function updateASimpleGallery() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleries.update("myResourceGroup", "myGalleryName", {
    description: "This is the gallery description.",
  });
  console.log(result);
}

async function main() {
  await updateASimpleGallery();
}

main().catch(console.error);
