// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-disk");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to grants access to a disk.
 *
 * @summary grants access to a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_BeginGetAccess.json
 */
async function getASasOnAManagedDisk() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.disks.grantAccess("myResourceGroup", "myDisk", {
    access: "Read",
    durationInSeconds: 300,
    fileFormat: "VHD",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to grants access to a disk.
 *
 * @summary grants access to a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_BeginGetAccess_WithVMGuestState.json
 */
async function getSasOnManagedDiskAndVMGuestState() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.disks.grantAccess("myResourceGroup", "myDisk", {
    access: "Read",
    durationInSeconds: 300,
    getSecureVMGuestStateSAS: true,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to grants access to a disk.
 *
 * @summary grants access to a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_BeginGetAccess_WithVMGuestStateAndVMMetadata.json
 */
async function getSasOnManagedDiskVMGuestStateAndVMMetadataForConfidentialVM() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.disks.grantAccess("myResourceGroup", "myDisk", {
    access: "Read",
    durationInSeconds: 300,
    getSecureVMGuestStateSAS: true,
  });
  console.log(result);
}

async function main() {
  await getASasOnAManagedDisk();
  await getSasOnManagedDiskAndVMGuestState();
  await getSasOnManagedDiskVMGuestStateAndVMMetadataForConfidentialVM();
}

main().catch(console.error);
