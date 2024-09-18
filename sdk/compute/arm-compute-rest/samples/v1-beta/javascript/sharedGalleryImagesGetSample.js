// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createComputeManagementClient = require("@azure-rest/arm-compute").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Get a shared gallery image by subscription id or tenant id.
 *
 * @summary Get a shared gallery image by subscription id or tenant id.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2022-01-03/examples/sharedGalleryExamples/SharedGalleryImage_Get.json
 */
async function getASharedGalleryImage() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "myLocation";
  const galleryUniqueName = "galleryUniqueName";
  const galleryImageName = "myGalleryImageName";
  const options = {
    queryParameters: { "api-version": "2022-01-03" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/sharedGalleries/{galleryUniqueName}/images/{galleryImageName}",
      subscriptionId,
      location,
      galleryUniqueName,
      galleryImageName
    )
    .get(options);
  console.log(result);
}

getASharedGalleryImage().catch(console.error);
