// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-gallery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a shared gallery image version by subscription id or tenant id.
 *
 * @summary get a shared gallery image version by subscription id or tenant id.
 * x-ms-original-file: 2024-03-03/sharedGalleryExamples/SharedGalleryImageVersion_Get.json
 */
async function getASharedGalleryImageVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.sharedGalleryImageVersions.get(
    "myLocation",
    "galleryUniqueName",
    "myGalleryImageName",
    "myGalleryImageVersionName",
  );
  console.log(result);
}

async function main() {
  await getASharedGalleryImageVersion();
}

main().catch(console.error);
