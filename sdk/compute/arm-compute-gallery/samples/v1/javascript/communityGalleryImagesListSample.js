// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-gallery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list community gallery images inside a gallery.
 *
 * @summary list community gallery images inside a gallery.
 * x-ms-original-file: 2024-03-03/communityGalleryExamples/CommunityGalleryImage_List.json
 */
async function listCommunityGalleryImages() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.communityGalleryImages.list("myLocation", "publicGalleryName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listCommunityGalleryImages();
}

main().catch(console.error);
