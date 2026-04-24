// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a gallery image version.
 *
 * @summary update a gallery image version.
 * x-ms-original-file: 2025-03-03/galleryExamples/GalleryImageVersion_Update.json
 */
async function updateASimpleGalleryImageVersionManagedImageAsSource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleryImageVersions.update(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
    "1.0.0",
    {
      publishingProfile: {
        targetRegions: [
          { name: "West US", regionalReplicaCount: 1 },
          { name: "East US", regionalReplicaCount: 2, storageAccountType: "Standard_ZRS" },
        ],
      },
      storageProfile: {
        source: {
          id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/images/{imageName}",
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update a gallery image version.
 *
 * @summary update a gallery image version.
 * x-ms-original-file: 2025-03-03/galleryExamples/GalleryImageVersion_Update_RestoreSoftDeleted.json
 */
async function restoreASoftDeletedGalleryImageVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleryImageVersions.update(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
    "1.0.0",
    { restore: true, storageProfile: {} },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update a gallery image version.
 *
 * @summary update a gallery image version.
 * x-ms-original-file: 2025-03-03/galleryExamples/GalleryImageVersion_Update_WithoutSourceId.json
 */
async function updateASimpleGalleryImageVersionWithoutSourceId() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleryImageVersions.update(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
    "1.0.0",
    {
      publishingProfile: {
        targetRegions: [
          { name: "West US", regionalReplicaCount: 1 },
          { name: "East US", regionalReplicaCount: 2, storageAccountType: "Standard_ZRS" },
        ],
      },
      storageProfile: {},
    },
  );
  console.log(result);
}

async function main() {
  await updateASimpleGalleryImageVersionManagedImageAsSource();
  await restoreASoftDeletedGalleryImageVersion();
  await updateASimpleGalleryImageVersionWithoutSourceId();
}

main().catch(console.error);
