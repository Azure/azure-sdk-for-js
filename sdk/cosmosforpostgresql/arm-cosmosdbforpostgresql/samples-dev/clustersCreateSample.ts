// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a new cluster with servers.
 *
 * @summary Creates a new cluster with servers.
 * x-ms-original-file: specification/postgresqlhsc/resource-manager/Microsoft.DBforPostgreSQL/preview/2023-03-02-preview/examples/ClusterCreatePITR.json
 */

import type { Cluster } from "@azure/arm-cosmosdbforpostgresql";
import { CosmosDBForPostgreSQL } from "@azure/arm-cosmosdbforpostgresql";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createANewClusterAsAPointInTimeRestore(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSFORPOSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSFORPOSTGRESQL_RESOURCE_GROUP"] || "TestGroup";
  const clusterName = "testcluster";
  const parameters: Cluster = {
    location: "westus",
    pointInTimeUTC: new Date("2017-12-14T00:00:37.467Z"),
    sourceLocation: "westus",
    sourceResourceId:
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/TestResourceGroup/providers/Microsoft.DBforPostgreSQL/serverGroupsv2/source-cluster",
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const result = await client.clusters.beginCreateAndWait(
    resourceGroupName,
    clusterName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new cluster with servers.
 *
 * @summary Creates a new cluster with servers.
 * x-ms-original-file: specification/postgresqlhsc/resource-manager/Microsoft.DBforPostgreSQL/preview/2023-03-02-preview/examples/ClusterCreateReadReplica.json
 */
async function createANewClusterAsAReadReplica(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSFORPOSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSFORPOSTGRESQL_RESOURCE_GROUP"] || "TestGroup";
  const clusterName = "testcluster";
  const parameters: Cluster = {
    location: "westus",
    sourceLocation: "westus",
    sourceResourceId:
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/TestResourceGroup/providers/Microsoft.DBforPostgreSQL/serverGroupsv2/sourcecluster",
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const result = await client.clusters.beginCreateAndWait(
    resourceGroupName,
    clusterName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new cluster with servers.
 *
 * @summary Creates a new cluster with servers.
 * x-ms-original-file: specification/postgresqlhsc/resource-manager/Microsoft.DBforPostgreSQL/preview/2023-03-02-preview/examples/ClusterCreateMultiNode.json
 */
async function createANewMultiNodeCluster(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSFORPOSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSFORPOSTGRESQL_RESOURCE_GROUP"] || "TestGroup";
  const clusterName = "testcluster-multinode";
  const parameters: Cluster = {
    administratorLoginPassword: "password",
    citusVersion: "11.1",
    coordinatorEnablePublicIpAccess: true,
    coordinatorServerEdition: "GeneralPurpose",
    coordinatorStorageQuotaInMb: 524288,
    coordinatorVCores: 4,
    enableHa: true,
    enableShardsOnCoordinator: false,
    location: "westus",
    nodeCount: 3,
    nodeEnablePublicIpAccess: false,
    nodeServerEdition: "MemoryOptimized",
    nodeStorageQuotaInMb: 524288,
    nodeVCores: 8,
    postgresqlVersion: "15",
    preferredPrimaryZone: "1",
    tags: {},
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const result = await client.clusters.beginCreateAndWait(
    resourceGroupName,
    clusterName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new cluster with servers.
 *
 * @summary Creates a new cluster with servers.
 * x-ms-original-file: specification/postgresqlhsc/resource-manager/Microsoft.DBforPostgreSQL/preview/2023-03-02-preview/examples/ClusterCreateBurstablev1.json
 */
async function createANewSingleNodeBurstable1VCoreCluster(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSFORPOSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSFORPOSTGRESQL_RESOURCE_GROUP"] || "TestGroup";
  const clusterName = "testcluster-burstablev1";
  const parameters: Cluster = {
    administratorLoginPassword: "password",
    citusVersion: "11.3",
    coordinatorEnablePublicIpAccess: true,
    coordinatorServerEdition: "BurstableMemoryOptimized",
    coordinatorStorageQuotaInMb: 131072,
    coordinatorVCores: 1,
    enableHa: false,
    enableShardsOnCoordinator: true,
    location: "westus",
    nodeCount: 0,
    postgresqlVersion: "15",
    preferredPrimaryZone: "1",
    tags: { owner: "JohnDoe" },
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const result = await client.clusters.beginCreateAndWait(
    resourceGroupName,
    clusterName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new cluster with servers.
 *
 * @summary Creates a new cluster with servers.
 * x-ms-original-file: specification/postgresqlhsc/resource-manager/Microsoft.DBforPostgreSQL/preview/2023-03-02-preview/examples/ClusterCreateBurstablev2.json
 */
async function createANewSingleNodeBurstable2VCoresCluster(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSFORPOSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSFORPOSTGRESQL_RESOURCE_GROUP"] || "TestGroup";
  const clusterName = "testcluster-burstablev2";
  const parameters: Cluster = {
    administratorLoginPassword: "password",
    citusVersion: "11.3",
    coordinatorEnablePublicIpAccess: true,
    coordinatorServerEdition: "BurstableGeneralPurpose",
    coordinatorStorageQuotaInMb: 131072,
    coordinatorVCores: 2,
    enableHa: false,
    enableShardsOnCoordinator: true,
    location: "westus",
    nodeCount: 0,
    postgresqlVersion: "15",
    preferredPrimaryZone: "1",
    tags: { owner: "JohnDoe" },
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const result = await client.clusters.beginCreateAndWait(
    resourceGroupName,
    clusterName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new cluster with servers.
 *
 * @summary Creates a new cluster with servers.
 * x-ms-original-file: specification/postgresqlhsc/resource-manager/Microsoft.DBforPostgreSQL/preview/2023-03-02-preview/examples/ClusterCreateSingleNode.json
 */
async function createANewSingleNodeCluster(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSFORPOSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSFORPOSTGRESQL_RESOURCE_GROUP"] || "TestGroup";
  const clusterName = "testcluster-singlenode";
  const parameters: Cluster = {
    administratorLoginPassword: "password",
    citusVersion: "11.3",
    coordinatorEnablePublicIpAccess: true,
    coordinatorServerEdition: "GeneralPurpose",
    coordinatorStorageQuotaInMb: 131072,
    coordinatorVCores: 8,
    enableHa: true,
    enableShardsOnCoordinator: true,
    location: "westus",
    nodeCount: 0,
    postgresqlVersion: "15",
    preferredPrimaryZone: "1",
    tags: { owner: "JohnDoe" },
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const result = await client.clusters.beginCreateAndWait(
    resourceGroupName,
    clusterName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createANewClusterAsAPointInTimeRestore();
  await createANewClusterAsAReadReplica();
  await createANewMultiNodeCluster();
  await createANewSingleNodeBurstable1VCoreCluster();
  await createANewSingleNodeBurstable2VCoresCluster();
  await createANewSingleNodeCluster();
}

main().catch(console.error);
