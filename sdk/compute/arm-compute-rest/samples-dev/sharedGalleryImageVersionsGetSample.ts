// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a shared gallery image version by subscription id or tenant id.
 *
 * @summary Get a shared gallery image version by subscription id or tenant id.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2022-01-03/examples/sharedGalleryExamples/SharedGalleryImageVersion_Get.json
 */

import type { SharedGalleryImageVersionsGetParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getASharedGalleryImageVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "myLocation";
  const galleryUniqueName = "galleryUniqueName";
  const galleryImageName = "myGalleryImageName";
  const galleryImageVersionName = "myGalleryImageVersionName";
  const options: SharedGalleryImageVersionsGetParameters = {
    queryParameters: { "api-version": "2022-01-03" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/sharedGalleries/{galleryUniqueName}/images/{galleryImageName}/versions/{galleryImageVersionName}",
      subscriptionId,
      location,
      galleryUniqueName,
      galleryImageName,
      galleryImageVersionName,
    )
    .get(options);
  console.log(result);
}

getASharedGalleryImageVersion().catch(console.error);
