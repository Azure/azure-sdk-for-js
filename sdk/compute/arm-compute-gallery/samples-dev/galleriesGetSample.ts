// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves information about a Shared Image Gallery.
 *
 * @summary retrieves information about a Shared Image Gallery.
 * x-ms-original-file: 2024-03-03/galleryExamples/CommunityGallery_Get.json
 */
async function getACommunityGallery(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.galleries.get("myResourceGroup", "myGalleryName");
  console.log(result);
}

/**
 * This sample demonstrates how to retrieves information about a Shared Image Gallery.
 *
 * @summary retrieves information about a Shared Image Gallery.
 * x-ms-original-file: 2024-03-03/galleryExamples/Gallery_Get.json
 */
async function getAGallery(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.galleries.get("myResourceGroup", "myGalleryName");
  console.log(result);
}

/**
 * This sample demonstrates how to retrieves information about a Shared Image Gallery.
 *
 * @summary retrieves information about a Shared Image Gallery.
 * x-ms-original-file: 2024-03-03/galleryExamples/Gallery_Get_WithExpandSharingProfileGroups.json
 */
async function getAGalleryWithExpandSharingProfileGroups(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.galleries.get("myResourceGroup", "myGalleryName", {
    expand: "SharingProfile/Groups",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to retrieves information about a Shared Image Gallery.
 *
 * @summary retrieves information about a Shared Image Gallery.
 * x-ms-original-file: 2024-03-03/galleryExamples/Gallery_Get_WithManagedIdentity.json
 */
async function getAGalleryWithSystemAssignedAndUserAssignedManagedIdentities(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.galleries.get("myResourceGroup", "myGalleryName");
  console.log(result);
}

/**
 * This sample demonstrates how to retrieves information about a Shared Image Gallery.
 *
 * @summary retrieves information about a Shared Image Gallery.
 * x-ms-original-file: 2024-03-03/galleryExamples/Gallery_Get_WithSelectPermissions.json
 */
async function getAGalleryWithSelectPermissions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.galleries.get("myResourceGroup", "myGalleryName", {
    select: "Permissions",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await getACommunityGallery();
  await getAGallery();
  await getAGalleryWithExpandSharingProfileGroups();
  await getAGalleryWithSystemAssignedAndUserAssignedManagedIdentities();
  await getAGalleryWithSelectPermissions();
}

main().catch(console.error);
