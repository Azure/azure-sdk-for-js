// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-disk";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a disk access resource.
 *
 * @summary deletes a disk access resource.
 * x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccess_Delete.json
 */
async function deleteADiskAccessResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.diskAccesses.delete("myResourceGroup", "myDiskAccess");
}

async function main(): Promise<void> {
  await deleteADiskAccessResource();
}

main().catch(console.error);
