// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-gallery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a gallery image version.
 *
 * @summary update a gallery image version.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImageVersion_Update.json
 */
async function updateASimpleGalleryImageVersionManagedImageAsSource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.galleryImageVersions.update(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
    "1.0.0",
    {
      properties: {
        publishingProfile: {
          targetRegions: [
            { name: "West US", regionalReplicaCount: 1 },
            {
              name: "East US",
              regionalReplicaCount: 2,
              storageAccountType: "Standard_ZRS",
            },
          ],
        },
        storageProfile: {
          source: {
            id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/images/{imageName}",
          },
        },
      },
    },
  );
}

/**
 * This sample demonstrates how to update a gallery image version.
 *
 * @summary update a gallery image version.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImageVersion_Update_RestoreSoftDeleted.json
 */
async function restoreASoftDeletedGalleryImageVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.galleryImageVersions.update(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
    "1.0.0",
    { properties: { restore: true, storageProfile: {} } },
  );
}

/**
 * This sample demonstrates how to update a gallery image version.
 *
 * @summary update a gallery image version.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImageVersion_Update_WithoutSourceId.json
 */
async function updateASimpleGalleryImageVersionWithoutSourceId() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.galleryImageVersions.update(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
    "1.0.0",
    {
      properties: {
        publishingProfile: {
          targetRegions: [
            { name: "West US", regionalReplicaCount: 1 },
            {
              name: "East US",
              regionalReplicaCount: 2,
              storageAccountType: "Standard_ZRS",
            },
          ],
        },
        storageProfile: {},
      },
    },
  );
}

async function main() {
  await updateASimpleGalleryImageVersionManagedImageAsSource();
  await restoreASoftDeletedGalleryImageVersion();
  await updateASimpleGalleryImageVersionWithoutSourceId();
}

main().catch(console.error);
