// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-gallery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list galleries under a resource group.
 *
 * @summary list galleries under a resource group.
 * x-ms-original-file: 2024-03-03/galleryExamples/Gallery_ListByResourceGroup.json
 */
async function listGalleriesInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.galleries.listByResourceGroup("myResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listGalleriesInAResourceGroup();
}

main().catch(console.error);
