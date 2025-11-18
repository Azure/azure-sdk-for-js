// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-disk";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to grants access to a disk.
 *
 * @summary grants access to a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_BeginGetAccess.json
 */
async function getASasOnAManagedDisk(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
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
async function getSasOnManagedDiskAndVMGuestState(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
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
async function getSasOnManagedDiskVMGuestStateAndVMMetadataForConfidentialVM(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.grantAccess("myResourceGroup", "myDisk", {
    access: "Read",
    durationInSeconds: 300,
    getSecureVMGuestStateSAS: true,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await getASasOnAManagedDisk();
  await getSasOnManagedDiskAndVMGuestState();
  await getSasOnManagedDiskVMGuestStateAndVMMetadataForConfidentialVM();
}

main().catch(console.error);
