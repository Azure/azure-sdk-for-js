// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a gallery Application Definition.
 *
 * @summary create or update a gallery Application Definition.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryApplication_Create.json
 */
async function createOrUpdateASimpleGalleryApplication(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.galleryApplications.createOrUpdate(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryApplicationName",
    {
      location: "West US",
      properties: {
        description: "This is the gallery application description.",
        eula: "This is the gallery application EULA.",
        privacyStatementUri: "myPrivacyStatementUri}",
        releaseNoteUri: "myReleaseNoteUri",
        supportedOSType: "Windows",
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
    },
  );
}

async function main(): Promise<void> {
  await createOrUpdateASimpleGalleryApplication();
}

main().catch(console.error);
