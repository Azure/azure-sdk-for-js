// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update a gallery Application Definition.
 *
 * @summary Update a gallery Application Definition.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2022-01-03/examples/galleryExamples/GalleryApplication_Update.json
 */

import type { GalleryApplicationsUpdateParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient, { getLongRunningPoller } from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateASimpleGalleryApplication(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const galleryName = "myGalleryName";
  const galleryApplicationName = "myGalleryApplicationName";
  const options: GalleryApplicationsUpdateParameters = {
    body: {
      properties: {
        description: "This is the gallery application description.",
        eula: "This is the gallery application EULA.",
        privacyStatementUri: "myPrivacyStatementUri}",
        releaseNoteUri: "myReleaseNoteUri",
        supportedOSType: "Windows",
      },
    },
    queryParameters: { "api-version": "2022-01-03" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}",
      subscriptionId,
      resourceGroupName,
      galleryName,
      galleryApplicationName,
    )
    .patch(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

updateASimpleGalleryApplication().catch(console.error);
