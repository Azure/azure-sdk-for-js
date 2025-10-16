// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-disk");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a disk.
 *
 * @summary deletes a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Delete.json
 */
async function deleteAManagedDisk() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.disks.delete("myResourceGroup", "myDisk");
}

async function main() {
  await deleteAManagedDisk();
}

main().catch(console.error);
