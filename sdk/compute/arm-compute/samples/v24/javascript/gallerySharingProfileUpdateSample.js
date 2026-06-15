// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update sharing profile of a gallery.
 *
 * @summary update sharing profile of a gallery.
 * x-ms-original-file: 2025-03-03/galleryExamples/Gallery_AddToSharingProfile.json
 */
async function addSharingIdToTheSharingProfileOfAGallery() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.gallerySharingProfile.update("myResourceGroup", "myGalleryName", {
    operationType: "Add",
    groups: [
      {
        type: "Subscriptions",
        ids: ["34a4ab42-0d72-47d9-bd1a-aed207386dac", "380fd389-260b-41aa-bad9-0a83108c370b"],
      },
      { type: "AADTenants", ids: ["c24c76aa-8897-4027-9b03-8f7928b54ff6"] },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update sharing profile of a gallery.
 *
 * @summary update sharing profile of a gallery.
 * x-ms-original-file: 2025-03-03/galleryExamples/Gallery_EnableCommunityGallery.json
 */
async function shareAGalleryToCommunity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.gallerySharingProfile.update("myResourceGroup", "myGalleryName", {
    operationType: "EnableCommunity",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update sharing profile of a gallery.
 *
 * @summary update sharing profile of a gallery.
 * x-ms-original-file: 2025-03-03/galleryExamples/Gallery_ResetSharingProfile.json
 */
async function resetSharingProfileOfAGallery() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.gallerySharingProfile.update("myResourceGroup", "myGalleryName", {
    operationType: "Reset",
  });
  console.log(result);
}

async function main() {
  await addSharingIdToTheSharingProfileOfAGallery();
  await shareAGalleryToCommunity();
  await resetSharingProfileOfAGallery();
}

main().catch(console.error);
