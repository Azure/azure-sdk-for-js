// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to revokes access to a disk.
 *
 * @summary revokes access to a disk.
 * x-ms-original-file: 2026-03-02/diskExamples/Disk_EndGetAccess.json
 */
async function revokeAccessToAManagedDisk(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.disks.revokeAccess("myResourceGroup", "myDisk");
}

async function main(): Promise<void> {
  await revokeAccessToAManagedDisk();
}

main().catch(console.error);
