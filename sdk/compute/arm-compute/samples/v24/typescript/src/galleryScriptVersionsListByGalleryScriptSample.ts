// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list gallery Script Versions in a gallery Script Definition.
 *
 * @summary list gallery Script Versions in a gallery Script Definition.
 * x-ms-original-file: 2025-03-03/galleryScriptExamples/GalleryScriptVersion_ListByGalleryScript.json
 */
async function listGalleryScriptVersionsInAGalleryScriptDefinition(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.galleryScriptVersions.listByGalleryScript(
    "myResourceGroupName",
    "myGalleryName",
    "myGalleryScriptName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listGalleryScriptVersionsInAGalleryScriptDefinition();
}

main().catch(console.error);
