// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list soft-deleted resources of an artifact in the gallery, such as soft-deleted gallery image version of an image.
 *
 * @summary list soft-deleted resources of an artifact in the gallery, such as soft-deleted gallery image version of an image.
 * x-ms-original-file: 2025-03-03/galleryExamples/GallerySoftDeletedResource_ListByArtifactName.json
 */
async function listSoftDeletedResourcesOfAnArtifactInTheGallery() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.softDeletedResource.listByArtifactName(
    "myResourceGroup",
    "myGalleryName",
    "images",
    "myGalleryImageName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listSoftDeletedResourcesOfAnArtifactInTheGallery();
}

main().catch(console.error);
