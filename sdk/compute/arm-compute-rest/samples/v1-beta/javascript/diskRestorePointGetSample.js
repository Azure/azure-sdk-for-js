// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createComputeManagementClient = require("@azure-rest/arm-compute").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Get disk restorePoint resource
 *
 * @summary Get disk restorePoint resource
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2022-07-02/examples/diskRestorePointExamples/DiskRestorePoint_Get.json
 */
async function getAnIncrementalDiskRestorePointResource() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const restorePointCollectionName = "rpc";
  const vmRestorePointName = "vmrp";
  const diskRestorePointName = "TestDisk45ceb03433006d1baee0_b70cd924-3362-4a80-93c2-9415eaa12745";
  const options = {
    queryParameters: { "api-version": "2022-07-02" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{vmRestorePointName}/diskRestorePoints/{diskRestorePointName}",
      subscriptionId,
      resourceGroupName,
      restorePointCollectionName,
      vmRestorePointName,
      diskRestorePointName
    )
    .get(options);
  console.log(result);
}

getAnIncrementalDiskRestorePointResource().catch(console.error);
/**
 * This sample demonstrates how to Get disk restorePoint resource
 *
 * @summary Get disk restorePoint resource
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2022-07-02/examples/diskRestorePointExamples/DiskRestorePoint_Get_WhenSourceResourceIsFromDifferentRegion.json
 */
async function getAnIncrementalDiskRestorePointWhenSourceResourceIsFromADifferentRegion() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const restorePointCollectionName = "rpc";
  const vmRestorePointName = "vmrp";
  const diskRestorePointName = "TestDisk45ceb03433006d1baee0_b70cd924-3362-4a80-93c2-9415eaa12745";
  const options = {
    queryParameters: { "api-version": "2022-07-02" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{vmRestorePointName}/diskRestorePoints/{diskRestorePointName}",
      subscriptionId,
      resourceGroupName,
      restorePointCollectionName,
      vmRestorePointName,
      diskRestorePointName
    )
    .get(options);
  console.log(result);
}

getAnIncrementalDiskRestorePointWhenSourceResourceIsFromADifferentRegion().catch(console.error);
