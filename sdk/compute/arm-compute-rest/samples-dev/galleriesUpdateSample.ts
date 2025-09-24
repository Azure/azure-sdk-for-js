// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update a Shared Image Gallery.
 *
 * @summary Update a Shared Image Gallery.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2022-01-03/examples/galleryExamples/Gallery_Update.json
 */

import type { GalleriesUpdateParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient, { getLongRunningPoller } from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateASimpleGallery(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const galleryName = "myGalleryName";
  const options: GalleriesUpdateParameters = {
    body: { properties: { description: "This is the gallery description." } },
    queryParameters: { "api-version": "2022-01-03" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}",
      subscriptionId,
      resourceGroupName,
      galleryName,
    )
    .patch(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

updateASimpleGallery().catch(console.error);
