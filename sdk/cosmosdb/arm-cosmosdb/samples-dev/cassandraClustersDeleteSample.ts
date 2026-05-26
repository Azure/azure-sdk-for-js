// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a managed Cassandra cluster.
 *
 * @summary deletes a managed Cassandra cluster.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBManagedCassandraClusterDelete.json
 */
async function cosmosDBManagedCassandraClusterDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.cassandraClusters.delete("cassandra-prod-rg", "cassandra-prod");
}

async function main(): Promise<void> {
  await cosmosDBManagedCassandraClusterDelete();
}

main().catch(console.error);
