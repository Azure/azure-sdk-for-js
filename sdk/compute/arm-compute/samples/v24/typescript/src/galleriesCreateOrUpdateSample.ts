// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Shared Image Gallery.
 *
 * @summary create or update a Shared Image Gallery.
 * x-ms-original-file: 2025-03-03/galleryExamples/CommunityGallery_Create.json
 */
async function createACommunityGallery(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.galleries.createOrUpdate("myResourceGroup", "myGalleryName", {
    location: "West US",
    description: "This is the gallery description.",
    sharingProfile: {
      permissions: "Community",
      communityGalleryInfo: {
        publisherUri: "uri",
        publisherContact: "pir@microsoft.com",
        eula: "eula",
        publicNamePrefix: "PirPublic",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Shared Image Gallery.
 *
 * @summary create or update a Shared Image Gallery.
 * x-ms-original-file: 2025-03-03/galleryExamples/Gallery_Create.json
 */
async function createOrUpdateASimpleGallery(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.galleries.createOrUpdate("myResourceGroup", "myGalleryName", {
    location: "West US",
    description: "This is the gallery description.",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Shared Image Gallery.
 *
 * @summary create or update a Shared Image Gallery.
 * x-ms-original-file: 2025-03-03/galleryExamples/Gallery_Create_SoftDeletionEnabled.json
 */
async function createOrUpdateASimpleGalleryWithSoftDeletionEnabled(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.galleries.createOrUpdate("myResourceGroup", "myGalleryName", {
    location: "West US",
    description: "This is the gallery description.",
    softDeletePolicy: { isSoftDeleteEnabled: true },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Shared Image Gallery.
 *
 * @summary create or update a Shared Image Gallery.
 * x-ms-original-file: 2025-03-03/galleryExamples/Gallery_Create_WithManagedIdentity.json
 */
async function createOrUpdateASimpleGalleryWithSystemAssignedAndUserAssignedManagedIdentities(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.galleries.createOrUpdate("myResourceGroup", "myGalleryName", {
    location: "West US",
    identity: {
      type: "SystemAssigned, UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myIdentity":
          {},
      },
    },
    description: "This is the gallery description.",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Shared Image Gallery.
 *
 * @summary create or update a Shared Image Gallery.
 * x-ms-original-file: 2025-03-03/galleryExamples/Gallery_Create_WithSharingProfile.json
 */
async function createOrUpdateASimpleGalleryWithSharingProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.galleries.createOrUpdate("myResourceGroup", "myGalleryName", {
    location: "West US",
    description: "This is the gallery description.",
    sharingProfile: { permissions: "Groups" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createACommunityGallery();
  await createOrUpdateASimpleGallery();
  await createOrUpdateASimpleGalleryWithSoftDeletionEnabled();
  await createOrUpdateASimpleGalleryWithSystemAssignedAndUserAssignedManagedIdentities();
  await createOrUpdateASimpleGalleryWithSharingProfile();
}

main().catch(console.error);
