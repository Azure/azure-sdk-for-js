// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  GalleryApplicationVersionsUpdateParameters,
  getLongRunningPoller,
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Update a gallery Application Version.
 *
 * @summary Update a gallery Application Version.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2022-01-03/examples/galleryExamples/GalleryApplicationVersion_Update.json
 */
async function updateASimpleGalleryApplicationVersion() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const galleryName = "myGalleryName";
  const galleryApplicationName = "myGalleryApplicationName";
  const galleryApplicationVersionName = "1.0.0";
  const options: GalleryApplicationVersionsUpdateParameters = {
    body: {
      properties: {
        publishingProfile: {
          endOfLifeDate: new Date("2019-07-01T07:00:00Z"),
          manageActions: {
            install:
              'powershell -command "Expand-Archive -Path package.zip -DestinationPath C:package"',
            remove: "del C:package ",
          },
          replicaCount: 1,
          source: {
            mediaLink:
              "https://mystorageaccount.blob.core.windows.net/mycontainer/package.zip?{sasKey}",
          },
          storageAccountType: "Standard_LRS",
          targetRegions: [
            {
              name: "West US",
              regionalReplicaCount: 1,
              storageAccountType: "Standard_LRS",
            },
          ],
        },
      },
    },
    queryParameters: { "api-version": "2022-01-03" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}/versions/{galleryApplicationVersionName}",
      subscriptionId,
      resourceGroupName,
      galleryName,
      galleryApplicationName,
      galleryApplicationVersionName
    )
    .patch(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

updateASimpleGalleryApplicationVersion().catch(console.error);
