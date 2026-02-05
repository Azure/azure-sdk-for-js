// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieves information about a gallery script definition.
 *
 * @summary Retrieves information about a gallery script definition.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2025-03-03/examples/galleryScriptExamples/GalleryScript_Get.json
 */
async function getAGalleryScript(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const galleryName = "myGalleryName";
  const galleryScriptName = "myGalleryScriptName";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleryScripts.get(
    resourceGroupName,
    galleryName,
    galleryScriptName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAGalleryScript();
}

main().catch(console.error);
