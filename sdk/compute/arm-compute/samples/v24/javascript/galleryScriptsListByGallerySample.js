// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list gallery Script Definitions in a gallery.
 *
 * @summary list gallery Script Definitions in a gallery.
 * x-ms-original-file: 2025-03-03/galleryScriptExamples/GalleryScript_ListByGallery.json
 */
async function listGalleryScriptsInAGallery() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.galleryScripts.listByGallery(
    "myResourceGroup",
    "myGalleryName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listGalleryScriptsInAGallery();
}

main().catch(console.error);
