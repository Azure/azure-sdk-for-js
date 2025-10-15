// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves information about a gallery image version.
 *
 * @summary retrieves information about a gallery image version.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImageVersion_Get.json
 */
async function getAGalleryImageVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
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
async function getAGalleryImageVersionWithReplicationStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
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
async function getAGalleryImageVersionWithSnapshotsAsASource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
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
async function getAGalleryImageVersionWithValidationProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
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
async function getAGalleryImageVersionWithValidationProfileAndReplicationStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
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
async function getAGalleryImageVersionWithVhdAsASource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.galleryImageVersions.get(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
    "1.0.0",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAGalleryImageVersion();
  await getAGalleryImageVersionWithReplicationStatus();
  await getAGalleryImageVersionWithSnapshotsAsASource();
  await getAGalleryImageVersionWithValidationProfile();
  await getAGalleryImageVersionWithValidationProfileAndReplicationStatus();
  await getAGalleryImageVersionWithVhdAsASource();
}

main().catch(console.error);
