// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBForPostgreSQL } from "@azure/arm-cosmosdbforpostgresql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an existing cluster. The request body can contain one or several properties from the cluster definition.
 *
 * @summary updates an existing cluster. The request body can contain one or several properties from the cluster definition.
 * x-ms-original-file: 2023-03-02-preview/ClusterAddNode.json
 */
async function scaleOutAddNewWorkerNodes(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const result = await client.clusters.update("TestGroup", "testcluster", { nodeCount: 2 });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing cluster. The request body can contain one or several properties from the cluster definition.
 *
 * @summary updates an existing cluster. The request body can contain one or several properties from the cluster definition.
 * x-ms-original-file: 2023-03-02-preview/ClusterScaleCompute.json
 */
async function scaleComputeUpOrDown(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const result = await client.clusters.update("TestGroup", "testcluster", { nodeVCores: 16 });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing cluster. The request body can contain one or several properties from the cluster definition.
 *
 * @summary updates an existing cluster. The request body can contain one or several properties from the cluster definition.
 * x-ms-original-file: 2023-03-02-preview/ClusterScaleStorage.json
 */
async function scaleUpStorage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const result = await client.clusters.update("TestGroup", "testcluster", {
    nodeStorageQuotaInMb: 2097152,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing cluster. The request body can contain one or several properties from the cluster definition.
 *
 * @summary updates an existing cluster. The request body can contain one or several properties from the cluster definition.
 * x-ms-original-file: 2023-03-02-preview/ClusterUpdate.json
 */
async function updateMultipleConfigurationSettingsOfTheCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const result = await client.clusters.update("TestGroup", "testcluster", {
    administratorLoginPassword: "newpassword",
    coordinatorVCores: 16,
    nodeCount: 4,
    nodeVCores: 16,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing cluster. The request body can contain one or several properties from the cluster definition.
 *
 * @summary updates an existing cluster. The request body can contain one or several properties from the cluster definition.
 * x-ms-original-file: 2023-03-02-preview/ClusterUpdateMaintenanceWindow.json
 */
async function updateOrDefineMaintenanceWindow(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const result = await client.clusters.update("TestGroup", "testcluster", {
    maintenanceWindow: { customWindow: "Enabled", dayOfWeek: 0, startHour: 8, startMinute: 0 },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await scaleOutAddNewWorkerNodes();
  await scaleComputeUpOrDown();
  await scaleUpStorage();
  await updateMultipleConfigurationSettingsOfTheCluster();
  await updateOrDefineMaintenanceWindow();
}

main().catch(console.error);
