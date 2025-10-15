// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-gallery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list gallery Application Definitions in a gallery.
 *
 * @summary list gallery Application Definitions in a gallery.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryApplication_ListByGallery.json
 */
async function listGalleryApplicationsInAGallery() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.galleryApplications.listByGallery(
    "myResourceGroup",
    "myGalleryName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listGalleryApplicationsInAGallery();
}

main().catch(console.error);
