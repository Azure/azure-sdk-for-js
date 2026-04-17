// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list gallery Script Definitions in a gallery.
 *
 * @summary list gallery Script Definitions in a gallery.
 * x-ms-original-file: 2025-03-03/galleryScriptExamples/GalleryScript_ListByGallery.json
 */
async function listGalleryScriptsInAGallery(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.galleryScripts.listByGallery(
    "myResourceGroup",
    "myGalleryName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listGalleryScriptsInAGallery();
}

main().catch(console.error);
