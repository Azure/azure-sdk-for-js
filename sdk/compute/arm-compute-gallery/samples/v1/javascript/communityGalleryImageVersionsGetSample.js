// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-gallery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a community gallery image version.
 *
 * @summary get a community gallery image version.
 * x-ms-original-file: 2024-03-03/communityGalleryExamples/CommunityGalleryImageVersion_Get.json
 */
async function getACommunityGalleryImageVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.communityGalleryImageVersions.get(
    "myLocation",
    "publicGalleryName",
    "myGalleryImageName",
    "myGalleryImageVersionName",
  );
  console.log(result);
}

async function main() {
  await getACommunityGalleryImageVersion();
}

main().catch(console.error);
