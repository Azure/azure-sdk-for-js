// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list soft-deleted resources of an artifact in the gallery, such as soft-deleted gallery image version of an image.
 *
 * @summary list soft-deleted resources of an artifact in the gallery, such as soft-deleted gallery image version of an image.
 * x-ms-original-file: 2024-03-03/galleryExamples/GallerySoftDeletedResource_ListByArtifactName.json
 */
async function listSoftDeletedResourcesOfAnArtifactInTheGallery(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.galleries.listByArtifactName(
    "myResourceGroup",
    "myGalleryName",
    "images",
    "myGalleryImageName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listSoftDeletedResourcesOfAnArtifactInTheGallery();
}

main().catch(console.error);
