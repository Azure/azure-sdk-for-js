// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieves information about a gallery Application Version.
 *
 * @summary Retrieves information about a gallery Application Version.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2022-01-03/examples/galleryExamples/GalleryApplicationVersion_Get_WithReplicationStatus.json
 */

import type { GalleryApplicationVersionsGetParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAGalleryApplicationVersionWithReplicationStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const galleryName = "myGalleryName";
  const galleryApplicationName = "myGalleryApplicationName";
  const galleryApplicationVersionName = "1.0.0";
  const options: GalleryApplicationVersionsGetParameters = {
    queryParameters: {
      $expand: "ReplicationStatus",
      "api-version": "2022-01-03",
    },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}/versions/{galleryApplicationVersionName}",
      subscriptionId,
      resourceGroupName,
      galleryName,
      galleryApplicationName,
      galleryApplicationVersionName,
    )
    .get(options);
  console.log(result);
}

getAGalleryApplicationVersionWithReplicationStatus().catch(console.error);
/**
 * This sample demonstrates how to Retrieves information about a gallery Application Version.
 *
 * @summary Retrieves information about a gallery Application Version.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2022-01-03/examples/galleryExamples/GalleryApplicationVersion_Get.json
 */
async function getAGalleryApplicationVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const galleryName = "myGalleryName";
  const galleryApplicationName = "myGalleryApplicationName";
  const galleryApplicationVersionName = "1.0.0";
  const options: GalleryApplicationVersionsGetParameters = {
    queryParameters: { "api-version": "2022-01-03" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}/versions/{galleryApplicationVersionName}",
      subscriptionId,
      resourceGroupName,
      galleryName,
      galleryApplicationName,
      galleryApplicationVersionName,
    )
    .get(options);
  console.log(result);
}

getAGalleryApplicationVersion().catch(console.error);
