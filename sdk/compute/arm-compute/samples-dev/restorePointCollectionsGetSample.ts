// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to get the restore point collection.
 *
 * @summary The operation to get the restore point collection.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2024-11-01/examples/restorePointExamples/RestorePointCollection_Get.json
 */

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getARestorePointCollectionButNotTheRestorePointsContainedInTheRestorePointCollection(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
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
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2024-11-01/examples/restorePointExamples/RestorePointCollection_Get_WithContainedRestorePoints.json
 */
async function getARestorePointCollectionIncludingTheRestorePointsContainedInTheRestorePointCollection(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const restorePointCollectionName = "rpcName";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.restorePointCollections.get(
    resourceGroupName,
    restorePointCollectionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getARestorePointCollectionButNotTheRestorePointsContainedInTheRestorePointCollection();
  await getARestorePointCollectionIncludingTheRestorePointsContainedInTheRestorePointCollection();
}

main().catch(console.error);
