// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-disk";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates (patches) a disk access resource.
 *
 * @summary updates (patches) a disk access resource.
 * x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccess_Update.json
 */
async function updateADiskAccessResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.diskAccesses.update("myResourceGroup", "myDiskAccess", {
    tags: { department: "Development", project: "PrivateEndpoints" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateADiskAccessResource();
}

main().catch(console.error);
