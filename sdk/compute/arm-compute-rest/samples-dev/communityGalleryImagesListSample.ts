// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List community gallery images inside a gallery.
 *
 * @summary List community gallery images inside a gallery.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2022-01-03/examples/communityGalleryExamples/CommunityGalleryImage_List.json
 */

import type { CommunityGalleryImagesListParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient, { paginate } from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listCommunityGalleryImages(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "myLocation";
  const publicGalleryName = "publicGalleryName";
  const options: CommunityGalleryImagesListParameters = {
    queryParameters: { "api-version": "2022-01-03" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/communityGalleries/{publicGalleryName}/images",
      subscriptionId,
      location,
      publicGalleryName,
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

listCommunityGalleryImages().catch(console.error);
