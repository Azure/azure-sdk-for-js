// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a gallery Script Definition.
 *
 * @summary update a gallery Script Definition.
 * x-ms-original-file: 2025-03-03/galleryScriptExamples/GalleryScript_Update.json
 */
async function updateASimpleGalleryScript() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.galleryScripts.update(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryScriptName",
    {
      description: "This is the gallery script description.",
      eula: "This is the gallery script EULA.",
      privacyStatementUri: "{myPrivacyStatementUri}",
      releaseNoteUri: "{myReleaseNoteUri}",
      supportedOSType: "Windows",
    },
  );
  console.log(result);
}

async function main() {
  await updateASimpleGalleryScript();
}

main().catch(console.error);
