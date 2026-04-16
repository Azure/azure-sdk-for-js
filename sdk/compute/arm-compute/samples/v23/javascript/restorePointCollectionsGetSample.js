// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to The operation to get the restore point collection.
 *
 * @summary The operation to get the restore point collection.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/restorePointExamples/RestorePointCollection_Get.json
 */
async function getARestorePointCollectionButNotTheRestorePointsContainedInTheRestorePointCollection() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const restorePointCollectionName = "myRpc";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.restorePointCollections.get(
    resourceGroupName,
    restorePointCollectionName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to The operation to get the restore point collection.
 *
 * @summary The operation to get the restore point collection.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/restorePointExamples/RestorePointCollection_Get_WithContainedRestorePoints.json
 */
async function getARestorePointCollectionIncludingTheRestorePointsContainedInTheRestorePointCollection() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const restorePointCollectionName = "rpcName";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.restorePointCollections.get(
    resourceGroupName,
    restorePointCollectionName,
  );
  console.log(result);
}

async function main() {
  await getARestorePointCollectionButNotTheRestorePointsContainedInTheRestorePointCollection();
  await getARestorePointCollectionIncludingTheRestorePointsContainedInTheRestorePointCollection();
}

main().catch(console.error);
