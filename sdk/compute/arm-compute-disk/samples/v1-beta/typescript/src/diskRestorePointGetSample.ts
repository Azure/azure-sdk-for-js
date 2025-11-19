// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-disk";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get disk restorePoint resource
 *
 * @summary get disk restorePoint resource
 * x-ms-original-file: 2025-01-02/diskRestorePointExamples/DiskRestorePoint_Get.json
 */
async function getAnIncrementalDiskRestorePointResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.diskRestorePoint.get(
    "myResourceGroup",
    "rpc",
    "vmrp",
    "TestDisk45ceb03433006d1baee0_b70cd924-3362-4a80-93c2-9415eaa12745",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get disk restorePoint resource
 *
 * @summary get disk restorePoint resource
 * x-ms-original-file: 2025-01-02/diskRestorePointExamples/DiskRestorePoint_Get_WhenSourceResourceIsFromDifferentRegion.json
 */
async function getAnIncrementalDiskRestorePointWhenSourceResourceIsFromADifferentRegion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.diskRestorePoint.get(
    "myResourceGroup",
    "rpc",
    "vmrp",
    "TestDisk45ceb03433006d1baee0_b70cd924-3362-4a80-93c2-9415eaa12745",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAnIncrementalDiskRestorePointResource();
  await getAnIncrementalDiskRestorePointWhenSourceResourceIsFromADifferentRegion();
}

main().catch(console.error);
