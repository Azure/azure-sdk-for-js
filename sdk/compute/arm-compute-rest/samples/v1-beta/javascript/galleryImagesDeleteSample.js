// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createComputeManagementClient = require("@azure-rest/arm-compute").default,
  { getLongRunningPoller } = require("@azure-rest/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Delete a gallery image.
 *
 * @summary Delete a gallery image.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2022-01-03/examples/galleryExamples/GalleryImage_Delete.json
 */
async function deleteAGalleryImage() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const galleryName = "myGalleryName";
  const galleryImageName = "myGalleryImageName";
  const options = {
    queryParameters: { "api-version": "2022-01-03" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}",
      subscriptionId,
      resourceGroupName,
      galleryName,
      galleryImageName
    )
    .delete(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

deleteAGalleryImage().catch(console.error);
