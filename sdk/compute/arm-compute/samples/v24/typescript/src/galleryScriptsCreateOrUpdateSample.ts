// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Gallery Script Definition. Gallery scripts allow the storage, sharing and reuse of common scripts
 *
 * @summary create or update a Gallery Script Definition. Gallery scripts allow the storage, sharing and reuse of common scripts
 * x-ms-original-file: 2025-03-03/galleryScriptExamples/GalleryScript_Create.json
 */
async function createOrUpdateASimpleGalleryScript(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.galleryScripts.createOrUpdate(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryScriptName",
    {
      location: "West US",
      properties: {
        description: "This is the gallery script description.",
        eula: "This is the gallery script EULA.",
        privacyStatementUri: "{myPrivacyStatementUri}",
        releaseNoteUri: "{myReleaseNoteUri}",
        supportedOSType: "Windows",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateASimpleGalleryScript();
}

main().catch(console.error);
