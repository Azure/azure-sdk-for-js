// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a gallery Script Definition.
 *
 * @summary delete a gallery Script Definition.
 * x-ms-original-file: 2025-03-03/galleryScriptExamples/GalleryScript_Delete.json
 */
async function deleteAGalleryScript(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.galleryScripts.delete("myResourceGroup", "myGalleryName", "myGalleryScriptName");
}

async function main(): Promise<void> {
  await deleteAGalleryScript();
}

main().catch(console.error);
