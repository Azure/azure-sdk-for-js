// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-gallery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list shared galleries by subscription id or tenant id.
 *
 * @summary list shared galleries by subscription id or tenant id.
 * x-ms-original-file: 2024-03-03/sharedGalleryExamples/SharedGallery_List.json
 */
async function listSharedGalleries() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sharedGalleries.list("myLocation")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listSharedGalleries();
}

main().catch(console.error);
