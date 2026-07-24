// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get disk restorePoint resource
 *
 * @summary get disk restorePoint resource
 * x-ms-original-file: 2026-03-02/diskRestorePointExamples/DiskRestorePoint_Get.json
 */
async function getAnIncrementalDiskRestorePointResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
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
 * x-ms-original-file: 2026-03-02/diskRestorePointExamples/DiskRestorePoint_Get_WhenSourceResourceIsFromDifferentRegion.json
 */
async function getAnIncrementalDiskRestorePointWhenSourceResourceIsFromADifferentRegion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
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
 * x-ms-original-file: 2026-03-02/diskRestorePointExamples/DiskRestorePoint_Get_WithConfidentialVMVersion.json
 */
async function getAConfidentialVMIncrementalDiskRestorePointResourceWithConfidentialVMVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.diskRestorePoint.get(
    "myResourceGroup",
    "rpc",
    "vmrp",
    "myConfidentialDisk_c4bc27e0-ccf6-494e-a740-af34de775527",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get disk restorePoint resource
 *
 * @summary get disk restorePoint resource
 * x-ms-original-file: 2026-03-02/diskRestorePointExamples/DiskRestorePoint_Get_WithInstantAccess.json
 */
async function getADiskRestorePointResourceWithInstantAccessSnapshotAccessState(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.diskRestorePoint.get(
    "myResourceGroup",
    "rpc",
    "vmrp",
    "TestDisk45ceb03433006d1baee_5c1528-43e2-4c77-9c55-a78bf5a5fc88",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAnIncrementalDiskRestorePointResource();
  await getAnIncrementalDiskRestorePointWhenSourceResourceIsFromADifferentRegion();
  await getAConfidentialVMIncrementalDiskRestorePointResourceWithConfidentialVMVersion();
  await getADiskRestorePointResourceWithInstantAccessSnapshotAccessState();
}

main().catch(console.error);
