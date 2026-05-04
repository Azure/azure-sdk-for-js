// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the CPU, memory, and disk usage statistics for each Cassandra node in a cluster.
 *
 * @summary gets the CPU, memory, and disk usage statistics for each Cassandra node in a cluster.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBManagedCassandraStatus.json
 */
async function cosmosDBManagedCassandraStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraClusters.status("cassandra-prod-rg", "cassandra-prod");
  console.log(result);
}

async function main() {
  await cosmosDBManagedCassandraStatus();
}

main().catch(console.error);
