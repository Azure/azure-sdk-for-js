// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, { GalleriesGetParameters } from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Retrieves information about a Shared Image Gallery.
 *
 * @summary Retrieves information about a Shared Image Gallery.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2022-01-03/examples/galleryExamples/CommunityGallery_Get.json
 */
async function getACommunityGallery() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const galleryName = "myGalleryName";
  const options: GalleriesGetParameters = {
    queryParameters: { "api-version": "2022-01-03" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}",
      subscriptionId,
      resourceGroupName,
      galleryName,
    )
    .get(options);
  console.log(result);
}

getACommunityGallery().catch(console.error);
/**
 * This sample demonstrates how to Retrieves information about a Shared Image Gallery.
 *
 * @summary Retrieves information about a Shared Image Gallery.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2022-01-03/examples/galleryExamples/Gallery_Get_WithExpandSharingProfileGroups.json
 */
async function getAGalleryWithExpandSharingProfileGroups() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const galleryName = "myGalleryName";
  const options: GalleriesGetParameters = {
    queryParameters: {
      "api-version": "2022-01-03",
      $expand: "SharingProfile/Groups",
    },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}",
      subscriptionId,
      resourceGroupName,
      galleryName,
    )
    .get(options);
  console.log(result);
}

getAGalleryWithExpandSharingProfileGroups().catch(console.error);
/**
 * This sample demonstrates how to Retrieves information about a Shared Image Gallery.
 *
 * @summary Retrieves information about a Shared Image Gallery.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2022-01-03/examples/galleryExamples/Gallery_Get_WithSelectPermissions.json
 */
async function getAGalleryWithSelectPermissions() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const galleryName = "myGalleryName";
  const options: GalleriesGetParameters = {
    queryParameters: { "api-version": "2022-01-03", $select: "Permissions" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}",
      subscriptionId,
      resourceGroupName,
      galleryName,
    )
    .get(options);
  console.log(result);
}

getAGalleryWithSelectPermissions().catch(console.error);
/**
 * This sample demonstrates how to Retrieves information about a Shared Image Gallery.
 *
 * @summary Retrieves information about a Shared Image Gallery.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2022-01-03/examples/galleryExamples/Gallery_Get.json
 */
async function getAGallery() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const galleryName = "myGalleryName";
  const options: GalleriesGetParameters = {
    queryParameters: { "api-version": "2022-01-03" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}",
      subscriptionId,
      resourceGroupName,
      galleryName,
    )
    .get(options);
  console.log(result);
}

getAGallery().catch(console.error);
