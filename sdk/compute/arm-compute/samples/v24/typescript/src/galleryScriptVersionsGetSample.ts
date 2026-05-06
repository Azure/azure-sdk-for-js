// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to custom ArmResourceRead operation template with CloudError as Error
 *
 * @summary custom ArmResourceRead operation template with CloudError as Error
 * x-ms-original-file: 2025-03-03/galleryScriptExamples/GalleryScriptVersion_Get.json
 */
async function getAGalleryScriptVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleryScriptVersions.get(
    "myResourceGroupName",
    "myGalleryName",
    "myGalleryScriptName",
    "1.0.0",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to custom ArmResourceRead operation template with CloudError as Error
 *
 * @summary custom ArmResourceRead operation template with CloudError as Error
 * x-ms-original-file: 2025-03-03/galleryScriptExamples/GalleryScriptVersion_Get_WithReplicationStatus.json
 */
async function getAGalleryScriptVersionWithReplicationStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleryScriptVersions.get(
    "myResourceGroupName",
    "myGalleryName",
    "myGalleryScriptName",
    "1.0.0",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAGalleryScriptVersion();
  await getAGalleryScriptVersionWithReplicationStatus();
}

main().catch(console.error);
