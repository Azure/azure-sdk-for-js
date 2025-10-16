// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list gallery Application Versions in a gallery Application Definition.
 *
 * @summary list gallery Application Versions in a gallery Application Definition.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryApplicationVersion_ListByGalleryApplication.json
 */
async function listGalleryApplicationVersionsInAGalleryApplicationDefinition(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.galleryApplicationVersions.listByGalleryApplication(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryApplicationName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listGalleryApplicationVersionsInAGalleryApplicationDefinition();
}

main().catch(console.error);
