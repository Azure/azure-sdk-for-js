// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a gallery Application Definition.
 *
 * @summary update a gallery Application Definition.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryApplication_Update.json
 */
async function updateASimpleGalleryApplication(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.galleryApplications.update(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryApplicationName",
    {
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
  await updateASimpleGalleryApplication();
}

main().catch(console.error);
