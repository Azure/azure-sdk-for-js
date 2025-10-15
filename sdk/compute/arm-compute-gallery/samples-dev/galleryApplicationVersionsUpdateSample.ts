// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a gallery Application Version.
 *
 * @summary update a gallery Application Version.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryApplicationVersion_Update.json
 */
async function updateASimpleGalleryApplicationVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.galleryApplicationVersions.update(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryApplicationName",
    "1.0.0",
    {
      properties: {
        publishingProfile: {
          source: {
            mediaLink:
              "https://mystorageaccount.blob.core.windows.net/mycontainer/package.zip?{sasKey}",
          },
          manageActions: {
            install:
              'powershell -command "Expand-Archive -Path package.zip -DestinationPath C:\\package"',
            remove: "del C:\\package ",
          },
          targetRegions: [
            {
              name: "West US",
              regionalReplicaCount: 1,
              storageAccountType: "Standard_LRS",
              excludeFromLatest: false,
            },
          ],
          replicaCount: 1,
          endOfLifeDate: new Date("2019-07-01T07:00:00Z"),
          storageAccountType: "Standard_LRS",
        },
        safetyProfile: { allowDeletionOfReplicatedLocations: false },
      },
    },
  );
}

async function main(): Promise<void> {
  await updateASimpleGalleryApplicationVersion();
}

main().catch(console.error);
