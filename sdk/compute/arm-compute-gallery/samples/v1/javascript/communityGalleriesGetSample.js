// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-gallery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a community gallery by gallery public name.
 *
 * @summary get a community gallery by gallery public name.
 * x-ms-original-file: 2024-03-03/communityGalleryExamples/CommunityGallery_Get.json
 */
async function getACommunityGallery() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.communityGalleries.get("myLocation", "publicGalleryName");
  console.log(result);
}

async function main() {
  await getACommunityGallery();
}

main().catch(console.error);
