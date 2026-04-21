// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a managed Cassandra data center.
 *
 * @summary delete a managed Cassandra data center.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBManagedCassandraDataCenterDelete.json
 */
async function cosmosDBManagedCassandraDataCenterDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.cassandraDataCenters.delete("cassandra-prod-rg", "cassandra-prod", "dc1");
}

async function main() {
  await cosmosDBManagedCassandraDataCenterDelete();
}

main().catch(console.error);
