// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeDiskClient } = require("@azure/arm-computedisk");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists diskRestorePoints under a vmRestorePoint.
 *
 * @summary lists diskRestorePoints under a vmRestorePoint.
 * x-ms-original-file: 2025-01-02/diskRestorePointExamples/DiskRestorePoint_ListByVmRestorePoint.json
 */
async function getAnIncrementalDiskRestorePointResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeDiskClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.diskRestorePoints.listByRestorePoint(
    "myResourceGroup",
    "rpc",
    "vmrp",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAnIncrementalDiskRestorePointResource();
}

main().catch(console.error);
