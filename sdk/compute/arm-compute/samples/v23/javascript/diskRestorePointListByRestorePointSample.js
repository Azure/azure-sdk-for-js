// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists diskRestorePoints under a vmRestorePoint.
 *
 * @summary Lists diskRestorePoints under a vmRestorePoint.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2025-01-02/examples/diskRestorePointExamples/DiskRestorePoint_ListByVmRestorePoint.json
 */
async function getAnIncrementalDiskRestorePointResource() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const restorePointCollectionName = "rpc";
  const vmRestorePointName = "vmrp";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.diskRestorePointOperations.listByRestorePoint(
    resourceGroupName,
    restorePointCollectionName,
    vmRestorePointName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await getAnIncrementalDiskRestorePointResource();
}

main().catch(console.error);
