// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update a gallery image version.
 *
 * @summary Update a gallery image version.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2022-01-03/examples/galleryExamples/GalleryImageVersion_Update.json
 */

import type { GalleryImageVersionsUpdateParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient, { getLongRunningPoller } from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateASimpleGalleryImageVersionManagedImageAsSource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const galleryName = "myGalleryName";
  const galleryImageName = "myGalleryImageName";
  const galleryImageVersionName = "1.0.0";
  const options: GalleryImageVersionsUpdateParameters = {
    body: {
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
    queryParameters: { "api-version": "2022-01-03" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}/versions/{galleryImageVersionName}",
      subscriptionId,
      resourceGroupName,
      galleryName,
      galleryImageName,
      galleryImageVersionName,
    )
    .patch(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

updateASimpleGalleryImageVersionManagedImageAsSource().catch(console.error);
/**
 * This sample demonstrates how to Update a gallery image version.
 *
 * @summary Update a gallery image version.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2022-01-03/examples/galleryExamples/GalleryImageVersion_Update_WithoutSourceId.json
 */
async function updateASimpleGalleryImageVersionWithoutSourceId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const galleryName = "myGalleryName";
  const galleryImageName = "myGalleryImageName";
  const galleryImageVersionName = "1.0.0";
  const options: GalleryImageVersionsUpdateParameters = {
    body: {
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
    queryParameters: { "api-version": "2022-01-03" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}/versions/{galleryImageVersionName}",
      subscriptionId,
      resourceGroupName,
      galleryName,
      galleryImageName,
      galleryImageVersionName,
    )
    .patch(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

updateASimpleGalleryImageVersionWithoutSourceId().catch(console.error);
