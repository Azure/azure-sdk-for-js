// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a disk.
 *
 * @summary gets information about a disk.
 * x-ms-original-file: 2026-03-02/diskExamples/Disk_Get.json
 */
async function getInformationAboutAManagedDisk(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.disks.get("myResourceGroup", "myManagedDisk");
  console.log(result);
}

/**
 * This sample demonstrates how to gets information about a disk.
 *
 * @summary gets information about a disk.
 * x-ms-original-file: 2026-03-02/diskExamples/Disk_Get_WithConfidentialVMVersion.json
 */
async function getInformationAboutAConfidentialVMDiskWithConfidentialVMVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.disks.get("myResourceGroup", "myConfidentialDisk");
  console.log(result);
}

async function main(): Promise<void> {
  await getInformationAboutAManagedDisk();
  await getInformationAboutAConfidentialVMDiskWithConfidentialVMVersion();
}

main().catch(console.error);
