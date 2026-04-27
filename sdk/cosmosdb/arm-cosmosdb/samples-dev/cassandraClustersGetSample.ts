// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the properties of a managed Cassandra cluster.
 *
 * @summary get the properties of a managed Cassandra cluster.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBManagedCassandraClusterGet.json
 */
async function cosmosDBManagedCassandraClusterGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraClusters.get("cassandra-prod-rg", "cassandra-prod");
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBManagedCassandraClusterGet();
}

main().catch(console.error);
