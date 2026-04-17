// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves information about a gallery script definition.
 *
 * @summary retrieves information about a gallery script definition.
 * x-ms-original-file: 2025-03-03/galleryScriptExamples/GalleryScript_Get.json
 */
async function getAGalleryScript() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.galleryScripts.get(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryScriptName",
  );
  console.log(result);
}

async function main() {
  await getAGalleryScript();
}

main().catch(console.error);
