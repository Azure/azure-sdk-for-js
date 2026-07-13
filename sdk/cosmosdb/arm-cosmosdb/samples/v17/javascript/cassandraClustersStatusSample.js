// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the CPU, memory, and disk usage statistics for each Cassandra node in a cluster.
 *
 * @summary gets the CPU, memory, and disk usage statistics for each Cassandra node in a cluster.
 * x-ms-original-file: 2026-03-15/CosmosDBManagedCassandraStatus.json
 */
async function cosmosDBManagedCassandraStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraClusters.status("cassandra-prod-rg", "cassandra-prod");
  console.log(result);
}

async function main() {
  await cosmosDBManagedCassandraStatus();
}

main().catch(console.error);
