// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createComputeManagementClient = require("@azure-rest/arm-compute").default,
  { getLongRunningPoller } = require("@azure-rest/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Update a Shared Image Gallery.
 *
 * @summary Update a Shared Image Gallery.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2022-01-03/examples/galleryExamples/Gallery_Update.json
 */
async function updateASimpleGallery() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const galleryName = "myGalleryName";
  const options = {
    body: { properties: { description: "This is the gallery description." } },
    queryParameters: { "api-version": "2022-01-03" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}",
      subscriptionId,
      resourceGroupName,
      galleryName
    )
    .patch(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

updateASimpleGallery().catch(console.error);
