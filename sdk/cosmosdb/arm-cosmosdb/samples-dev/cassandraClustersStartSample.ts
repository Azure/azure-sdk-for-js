// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to start the Managed Cassandra Cluster and Associated Data Centers. Start will start the host virtual machine of this cluster with reserved data disk. This won't do anything on an already running cluster. Use Deallocate to deallocate the cluster.
 *
 * @summary start the Managed Cassandra Cluster and Associated Data Centers. Start will start the host virtual machine of this cluster with reserved data disk. This won't do anything on an already running cluster. Use Deallocate to deallocate the cluster.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBManagedCassandraClusterStart.json
 */
async function cosmosDBManagedCassandraClusterStart(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.cassandraClusters.start("cassandra-prod-rg", "cassandra-prod");
}

async function main(): Promise<void> {
  await cosmosDBManagedCassandraClusterStart();
}

main().catch(console.error);
