// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves information about a gallery script definition.
 *
 * @summary retrieves information about a gallery script definition.
 * x-ms-original-file: 2025-03-03/galleryScriptExamples/GalleryScript_Get.json
 */
async function getAGalleryScript(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleryScripts.get(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryScriptName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAGalleryScript();
}

main().catch(console.error);
