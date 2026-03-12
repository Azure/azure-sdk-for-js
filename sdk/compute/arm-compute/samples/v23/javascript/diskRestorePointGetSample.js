// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get disk restorePoint resource
 *
 * @summary Get disk restorePoint resource
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2025-01-02/examples/diskRestorePointExamples/DiskRestorePoint_Get.json
 */
async function getAnIncrementalDiskRestorePointResource() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const restorePointCollectionName = "rpc";
  const vmRestorePointName = "vmrp";
  const diskRestorePointName = "TestDisk45ceb03433006d1baee0_b70cd924-3362-4a80-93c2-9415eaa12745";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.diskRestorePointOperations.get(
    resourceGroupName,
    restorePointCollectionName,
    vmRestorePointName,
    diskRestorePointName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Get disk restorePoint resource
 *
 * @summary Get disk restorePoint resource
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2025-01-02/examples/diskRestorePointExamples/DiskRestorePoint_Get_WhenSourceResourceIsFromDifferentRegion.json
 */
async function getAnIncrementalDiskRestorePointWhenSourceResourceIsFromADifferentRegion() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const restorePointCollectionName = "rpc";
  const vmRestorePointName = "vmrp";
  const diskRestorePointName = "TestDisk45ceb03433006d1baee0_b70cd924-3362-4a80-93c2-9415eaa12745";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.diskRestorePointOperations.get(
    resourceGroupName,
    restorePointCollectionName,
    vmRestorePointName,
    diskRestorePointName,
  );
  console.log(result);
}

async function main() {
  await getAnIncrementalDiskRestorePointResource();
  await getAnIncrementalDiskRestorePointWhenSourceResourceIsFromADifferentRegion();
}

main().catch(console.error);
