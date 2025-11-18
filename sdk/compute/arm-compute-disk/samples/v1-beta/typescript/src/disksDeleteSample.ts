// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-disk";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a disk.
 *
 * @summary deletes a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Delete.json
 */
async function deleteAManagedDisk(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.disks.delete("myResourceGroup", "myDisk");
}

async function main(): Promise<void> {
  await deleteAManagedDisk();
}

main().catch(console.error);
