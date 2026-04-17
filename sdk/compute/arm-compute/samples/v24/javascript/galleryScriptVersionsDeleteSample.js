// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a gallery Script Version.
 *
 * @summary delete a gallery Script Version.
 * x-ms-original-file: 2025-03-03/galleryScriptExamples/GalleryScriptVersion_Delete.json
 */
async function deleteAGalleryScriptVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.galleryScriptVersions.delete(
    "myResourceGroupName",
    "myGalleryName",
    "myGalleryScriptName",
    "1.0.0",
  );
}

async function main() {
  await deleteAGalleryScriptVersion();
}

main().catch(console.error);
