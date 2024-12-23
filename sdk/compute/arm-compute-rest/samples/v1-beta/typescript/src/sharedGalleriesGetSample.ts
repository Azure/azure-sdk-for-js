// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  SharedGalleriesGetParameters,
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Get a shared gallery by subscription id or tenant id.
 *
 * @summary Get a shared gallery by subscription id or tenant id.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2022-01-03/examples/sharedGalleryExamples/SharedGallery_Get.json
 */
async function getASharedGallery() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "myLocation";
  const galleryUniqueName = "galleryUniqueName";
  const options: SharedGalleriesGetParameters = {
    queryParameters: { "api-version": "2022-01-03" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/sharedGalleries/{galleryUniqueName}",
      subscriptionId,
      location,
      galleryUniqueName,
    )
    .get(options);
  console.log(result);
}

getASharedGallery().catch(console.error);
