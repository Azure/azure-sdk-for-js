// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeDiskClient } = require("@azure/arm-compute-disk");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about a disk.
 *
 * @summary gets information about a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Get.json
 */
async function getInformationAboutAManagedDisk() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeDiskClient(credential, subscriptionId);
  const result = await client.disks.get("myResourceGroup", "myManagedDisk");
  console.log(result);
}

async function main() {
  await getInformationAboutAManagedDisk();
}

main().catch(console.error);
