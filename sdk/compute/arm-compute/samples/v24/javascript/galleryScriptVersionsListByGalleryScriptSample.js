// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list gallery Script Versions in a gallery Script Definition.
 *
 * @summary list gallery Script Versions in a gallery Script Definition.
 * x-ms-original-file: 2025-03-03/galleryScriptExamples/GalleryScriptVersion_ListByGalleryScript.json
 */
async function listGalleryScriptVersionsInAGalleryScriptDefinition() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.galleryScriptVersions.listByGalleryScript(
    "myResourceGroupName",
    "myGalleryName",
    "myGalleryScriptName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listGalleryScriptVersionsInAGalleryScriptDefinition();
}

main().catch(console.error);
