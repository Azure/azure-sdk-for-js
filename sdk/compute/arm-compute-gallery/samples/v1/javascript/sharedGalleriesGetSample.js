// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-gallery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a shared gallery by subscription id or tenant id.
 *
 * @summary get a shared gallery by subscription id or tenant id.
 * x-ms-original-file: 2024-03-03/sharedGalleryExamples/SharedGallery_Get.json
 */
async function getASharedGallery() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.sharedGalleries.get("myLocation", "galleryUniqueName");
  console.log(result);
}

async function main() {
  await getASharedGallery();
}

main().catch(console.error);
