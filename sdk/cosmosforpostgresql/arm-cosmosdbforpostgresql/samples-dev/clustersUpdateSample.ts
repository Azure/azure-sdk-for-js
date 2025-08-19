// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClusterForUpdate } from "@azure/arm-cosmosdbforpostgresql";
import { CosmosDBForPostgreSQL } from "@azure/arm-cosmosdbforpostgresql";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates an existing cluster. The request body can contain one or several properties from the cluster definition.
 *
 * @summary Updates an existing cluster. The request body can contain one or several properties from the cluster definition.
 * x-ms-original-file: specification/postgresqlhsc/resource-manager/Microsoft.DBforPostgreSQL/preview/2023-03-02-preview/examples/ClusterScaleCompute.json
 */
async function scaleComputeUpOrDown(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSFORPOSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSFORPOSTGRESQL_RESOURCE_GROUP"] || "TestGroup";
  const clusterName = "testcluster";
  const parameters: ClusterForUpdate = { nodeVCores: 16 };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const result = await client.clusters.beginUpdateAndWait(
    resourceGroupName,
    clusterName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates an existing cluster. The request body can contain one or several properties from the cluster definition.
 *
 * @summary Updates an existing cluster. The request body can contain one or several properties from the cluster definition.
 * x-ms-original-file: specification/postgresqlhsc/resource-manager/Microsoft.DBforPostgreSQL/preview/2023-03-02-preview/examples/ClusterAddNode.json
 */
async function scaleOutAddNewWorkerNodes(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSFORPOSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSFORPOSTGRESQL_RESOURCE_GROUP"] || "TestGroup";
  const clusterName = "testcluster";
  const parameters: ClusterForUpdate = { nodeCount: 2 };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const result = await client.clusters.beginUpdateAndWait(
    resourceGroupName,
    clusterName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates an existing cluster. The request body can contain one or several properties from the cluster definition.
 *
 * @summary Updates an existing cluster. The request body can contain one or several properties from the cluster definition.
 * x-ms-original-file: specification/postgresqlhsc/resource-manager/Microsoft.DBforPostgreSQL/preview/2023-03-02-preview/examples/ClusterScaleStorage.json
 */
async function scaleUpStorage(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSFORPOSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSFORPOSTGRESQL_RESOURCE_GROUP"] || "TestGroup";
  const clusterName = "testcluster";
  const parameters: ClusterForUpdate = { nodeStorageQuotaInMb: 2097152 };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const result = await client.clusters.beginUpdateAndWait(
    resourceGroupName,
    clusterName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates an existing cluster. The request body can contain one or several properties from the cluster definition.
 *
 * @summary Updates an existing cluster. The request body can contain one or several properties from the cluster definition.
 * x-ms-original-file: specification/postgresqlhsc/resource-manager/Microsoft.DBforPostgreSQL/preview/2023-03-02-preview/examples/ClusterUpdate.json
 */
async function updateMultipleConfigurationSettingsOfTheCluster(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSFORPOSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSFORPOSTGRESQL_RESOURCE_GROUP"] || "TestGroup";
  const clusterName = "testcluster";
  const parameters: ClusterForUpdate = {
    administratorLoginPassword: "newpassword",
    coordinatorVCores: 16,
    nodeCount: 4,
    nodeVCores: 16,
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const result = await client.clusters.beginUpdateAndWait(
    resourceGroupName,
    clusterName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates an existing cluster. The request body can contain one or several properties from the cluster definition.
 *
 * @summary Updates an existing cluster. The request body can contain one or several properties from the cluster definition.
 * x-ms-original-file: specification/postgresqlhsc/resource-manager/Microsoft.DBforPostgreSQL/preview/2023-03-02-preview/examples/ClusterUpdateMaintenanceWindow.json
 */
async function updateOrDefineMaintenanceWindow(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSFORPOSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSFORPOSTGRESQL_RESOURCE_GROUP"] || "TestGroup";
  const clusterName = "testcluster";
  const parameters: ClusterForUpdate = {
    maintenanceWindow: {
      customWindow: "Enabled",
      dayOfWeek: 0,
      startHour: 8,
      startMinute: 0,
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const result = await client.clusters.beginUpdateAndWait(
    resourceGroupName,
    clusterName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await scaleComputeUpOrDown();
  await scaleOutAddNewWorkerNodes();
  await scaleUpStorage();
  await updateMultipleConfigurationSettingsOfTheCluster();
  await updateOrDefineMaintenanceWindow();
}

main().catch(console.error);
