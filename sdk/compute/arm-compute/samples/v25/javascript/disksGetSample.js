// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about a disk.
 *
 * @summary gets information about a disk.
 * x-ms-original-file: 2026-03-02/diskExamples/Disk_Get.json
 */
async function getInformationAboutAManagedDisk() {
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
async function getInformationAboutAConfidentialVMDiskWithConfidentialVMVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.disks.get("myResourceGroup", "myConfidentialDisk");
  console.log(result);
}

async function main() {
  await getInformationAboutAManagedDisk();
  await getInformationAboutAConfidentialVMDiskWithConfidentialVMVersion();
}

main().catch(console.error);
