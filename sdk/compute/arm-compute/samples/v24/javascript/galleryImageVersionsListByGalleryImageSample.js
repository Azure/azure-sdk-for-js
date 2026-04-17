// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list gallery image versions in a gallery image definition.
 *
 * @summary list gallery image versions in a gallery image definition.
 * x-ms-original-file: 2025-03-03/galleryExamples/GalleryImageVersion_ListByGalleryImage.json
 */
async function listGalleryImageVersionsInAGalleryImageDefinition() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.galleryImageVersions.listByGalleryImage(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listGalleryImageVersionsInAGalleryImageDefinition();
}

main().catch(console.error);
