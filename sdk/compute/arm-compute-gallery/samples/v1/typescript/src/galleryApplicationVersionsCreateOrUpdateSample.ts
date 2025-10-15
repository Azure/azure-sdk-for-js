// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a gallery Application Version.
 *
 * @summary create or update a gallery Application Version.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryApplicationVersion_Create.json
 */
async function createOrUpdateASimpleGalleryApplicationVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.galleryApplicationVersions.createOrUpdate(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryApplicationName",
    "1.0.0",
    {
      location: "West US",
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
          customActions: [
            {
              name: "myCustomAction",
              script: "myCustomActionScript",
              description: "This is the custom action description.",
              parameters: [
                {
                  name: "myCustomActionParameter",
                  required: false,
                  type: "String",
                  defaultValue: "default value of parameter.",
                  description: "This is the description of the parameter",
                },
              ],
            },
          ],
        },
        safetyProfile: { allowDeletionOfReplicatedLocations: false },
      },
    },
  );
}

async function main(): Promise<void> {
  await createOrUpdateASimpleGalleryApplicationVersion();
}

main().catch(console.error);
