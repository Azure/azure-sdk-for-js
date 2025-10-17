// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to get the restore point collection.
 *
 * @summary the operation to get the restore point collection.
 * x-ms-original-file: 2025-04-01/restorePointExamples/RestorePointCollection_Get.json
 */
async function getARestorePointCollectionButNotTheRestorePointsContainedInTheRestorePointCollection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.restorePointCollections.get("myResourceGroup", "myRpc");
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to get the restore point collection.
 *
 * @summary the operation to get the restore point collection.
 * x-ms-original-file: 2025-04-01/restorePointExamples/RestorePointCollection_Get_WithContainedRestorePoints.json
 */
async function getARestorePointCollectionIncludingTheRestorePointsContainedInTheRestorePointCollection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.restorePointCollections.get("myResourceGroup", "rpcName");
  console.log(result);
}

async function main() {
  await getARestorePointCollectionButNotTheRestorePointsContainedInTheRestorePointCollection();
  await getARestorePointCollectionIncludingTheRestorePointsContainedInTheRestorePointCollection();
}

main().catch(console.error);
