// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to List gallery Script Versions in a gallery Script Definition.
 *
 * @summary List gallery Script Versions in a gallery Script Definition.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2025-03-03/examples/galleryScriptExamples/GalleryScriptVersion_ListByGalleryScript.json
 */
async function listGalleryScriptVersionsInAGalleryScriptDefinition() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroupName";
  const galleryName = "myGalleryName";
  const galleryScriptName = "myGalleryScriptName";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.galleryScriptVersions.listByGalleryScript(
    resourceGroupName,
    galleryName,
    galleryScriptName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listGalleryScriptVersionsInAGalleryScriptDefinition();
}

main().catch(console.error);
