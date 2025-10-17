// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-gallery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves information about a gallery image version.
 *
 * @summary retrieves information about a gallery image version.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImageVersion_Get.json
 */
async function getAGalleryImageVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleryImageVersions.get(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
    "1.0.0",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to retrieves information about a gallery image version.
 *
 * @summary retrieves information about a gallery image version.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImageVersion_Get_WithReplicationStatus.json
 */
async function getAGalleryImageVersionWithReplicationStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleryImageVersions.get(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
    "1.0.0",
    { expand: "ReplicationStatus" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to retrieves information about a gallery image version.
 *
 * @summary retrieves information about a gallery image version.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImageVersion_Get_WithSnapshotsAsSource.json
 */
async function getAGalleryImageVersionWithSnapshotsAsASource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleryImageVersions.get(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
    "1.0.0",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to retrieves information about a gallery image version.
 *
 * @summary retrieves information about a gallery image version.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImageVersion_Get_WithValidationProfile.json
 */
async function getAGalleryImageVersionWithValidationProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleryImageVersions.get(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
    "1.0.0",
    { expand: "ValidationProfile" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to retrieves information about a gallery image version.
 *
 * @summary retrieves information about a gallery image version.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImageVersion_Get_WithValidationProfileAndReplicationStatus.json
 */
async function getAGalleryImageVersionWithValidationProfileAndReplicationStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleryImageVersions.get(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
    "1.0.0",
    { expand: "ValidationProfile,ReplicationStatus" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to retrieves information about a gallery image version.
 *
 * @summary retrieves information about a gallery image version.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImageVersion_Get_WithVhdAsSource.json
 */
async function getAGalleryImageVersionWithVhdAsASource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleryImageVersions.get(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
    "1.0.0",
  );
  console.log(result);
}

async function main() {
  await getAGalleryImageVersion();
  await getAGalleryImageVersionWithReplicationStatus();
  await getAGalleryImageVersionWithSnapshotsAsASource();
  await getAGalleryImageVersionWithValidationProfile();
  await getAGalleryImageVersionWithValidationProfileAndReplicationStatus();
  await getAGalleryImageVersionWithVhdAsASource();
}

main().catch(console.error);
