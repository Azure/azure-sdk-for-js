// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to get the restore point collection.
 *
 * @summary the operation to get the restore point collection.
 * x-ms-original-file: 2025-04-01/restorePointExamples/RestorePointCollection_Get.json
 */
async function getARestorePointCollectionButNotTheRestorePointsContainedInTheRestorePointCollection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.restorePointCollections.get("myResourceGroup", "myRpc");
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to get the restore point collection.
 *
 * @summary the operation to get the restore point collection.
 * x-ms-original-file: 2025-04-01/restorePointExamples/RestorePointCollection_Get_WithContainedRestorePoints.json
 */
async function getARestorePointCollectionIncludingTheRestorePointsContainedInTheRestorePointCollection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.restorePointCollections.get("myResourceGroup", "rpcName");
  console.log(result);
}

async function main(): Promise<void> {
  await getARestorePointCollectionButNotTheRestorePointsContainedInTheRestorePointCollection();
  await getARestorePointCollectionIncludingTheRestorePointsContainedInTheRestorePointCollection();
}

main().catch(console.error);
