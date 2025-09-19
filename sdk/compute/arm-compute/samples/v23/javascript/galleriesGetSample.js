// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Retrieves information about a Shared Image Gallery.
 *
 * @summary Retrieves information about a Shared Image Gallery.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2024-03-03/examples/galleryExamples/CommunityGallery_Get.json
 */
async function getACommunityGallery() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const galleryName = "myGalleryName";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleries.get(resourceGroupName, galleryName);
  console.log(result);
}

/**
 * This sample demonstrates how to Retrieves information about a Shared Image Gallery.
 *
 * @summary Retrieves information about a Shared Image Gallery.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2024-03-03/examples/galleryExamples/Gallery_Get_WithExpandSharingProfileGroups.json
 */
async function getAGalleryWithExpandSharingProfileGroups() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const galleryName = "myGalleryName";
  const expand = "SharingProfile/Groups";
  const options = { expand };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleries.get(resourceGroupName, galleryName, options);
  console.log(result);
}

/**
 * This sample demonstrates how to Retrieves information about a Shared Image Gallery.
 *
 * @summary Retrieves information about a Shared Image Gallery.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2024-03-03/examples/galleryExamples/Gallery_Get_WithSelectPermissions.json
 */
async function getAGalleryWithSelectPermissions() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const galleryName = "myGalleryName";
  const select = "Permissions";
  const options = { select };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleries.get(resourceGroupName, galleryName, options);
  console.log(result);
}

/**
 * This sample demonstrates how to Retrieves information about a Shared Image Gallery.
 *
 * @summary Retrieves information about a Shared Image Gallery.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2024-03-03/examples/galleryExamples/Gallery_Get_WithManagedIdentity.json
 */
async function getAGalleryWithSystemAssignedAndUserAssignedManagedIdentities() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const galleryName = "myGalleryName";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleries.get(resourceGroupName, galleryName);
  console.log(result);
}

/**
 * This sample demonstrates how to Retrieves information about a Shared Image Gallery.
 *
 * @summary Retrieves information about a Shared Image Gallery.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2024-03-03/examples/galleryExamples/Gallery_Get.json
 */
async function getAGallery() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const galleryName = "myGalleryName";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleries.get(resourceGroupName, galleryName);
  console.log(result);
}

async function main() {
  await getACommunityGallery();
  await getAGalleryWithExpandSharingProfileGroups();
  await getAGalleryWithSelectPermissions();
  await getAGalleryWithSystemAssignedAndUserAssignedManagedIdentities();
  await getAGallery();
}

main().catch(console.error);
