// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-gallery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a community gallery image.
 *
 * @summary get a community gallery image.
 * x-ms-original-file: 2024-03-03/communityGalleryExamples/CommunityGalleryImage_Get.json
 */
async function getACommunityGalleryImage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.communityGalleryImages.get(
    "myLocation",
    "publicGalleryName",
    "myGalleryImageName",
  );
  console.log(result);
}

async function main() {
  await getACommunityGalleryImage();
}

main().catch(console.error);
