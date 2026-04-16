// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to List gallery Script Definitions in a gallery.
 *
 * @summary List gallery Script Definitions in a gallery.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2025-03-03/examples/galleryScriptExamples/GalleryScript_ListByGallery.json
 */
async function listGalleryScriptsInAGallery() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const galleryName = "myGalleryName";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.galleryScripts.listByGallery(resourceGroupName, galleryName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listGalleryScriptsInAGallery();
}

main().catch(console.error);
