// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  CommunityGalleryImageVersionsListParameters,
  paginate
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to List community gallery image versions inside an image.
 *
 * @summary List community gallery image versions inside an image.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2022-01-03/examples/communityGalleryExamples/CommunityGalleryImageVersion_List.json
 */
async function listCommunityGalleryImageVersions() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "myLocation";
  const publicGalleryName = "publicGalleryName";
  const galleryImageName = "myGalleryImageName";
  const options: CommunityGalleryImageVersionsListParameters = {
    queryParameters: { "api-version": "2022-01-03" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/communityGalleries/{publicGalleryName}/images/{galleryImageName}/versions",
      subscriptionId,
      location,
      publicGalleryName,
      galleryImageName
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

listCommunityGalleryImageVersions().catch(console.error);
