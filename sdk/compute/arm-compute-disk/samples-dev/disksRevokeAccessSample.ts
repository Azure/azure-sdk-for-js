// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-disk";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to revokes access to a disk.
 *
 * @summary revokes access to a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_EndGetAccess.json
 */
async function revokeAccessToAManagedDisk(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.disks.revokeAccess("myResourceGroup", "myDisk");
  console.log(result);
}

async function main(): Promise<void> {
  await revokeAccessToAManagedDisk();
}

main().catch(console.error);
