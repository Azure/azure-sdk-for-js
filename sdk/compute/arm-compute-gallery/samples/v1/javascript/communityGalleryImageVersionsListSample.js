// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-gallery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list community gallery image versions inside an image.
 *
 * @summary list community gallery image versions inside an image.
 * x-ms-original-file: 2024-03-03/communityGalleryExamples/CommunityGalleryImageVersion_List.json
 */
async function listCommunityGalleryImageVersions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.communityGalleryImageVersions.list(
    "myLocation",
    "publicGalleryName",
    "myGalleryImageName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listCommunityGalleryImageVersions();
}

main().catch(console.error);
