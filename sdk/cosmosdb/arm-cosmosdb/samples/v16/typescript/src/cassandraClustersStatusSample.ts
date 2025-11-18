// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the CPU, memory, and disk usage statistics for each Cassandra node in a cluster.
 *
 * @summary Gets the CPU, memory, and disk usage statistics for each Cassandra node in a cluster.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2025-10-15/examples/CosmosDBManagedCassandraStatus.json
 */
async function cosmosDbManagedCassandraStatus(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["COSMOSDB_RESOURCE_GROUP"] || "cassandra-prod-rg";
  const clusterName = "cassandra-prod";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraClusters.status(
    resourceGroupName,
    clusterName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbManagedCassandraStatus();
}

main().catch(console.error);
