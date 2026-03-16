// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the properties of an individual backup of this cluster that is available to restore.
 *
 * @summary get the properties of an individual backup of this cluster that is available to restore.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBManagedCassandraBackup.json
 */
async function cosmosDBManagedCassandraBackup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraClusters.getBackup(
    "cassandra-prod-rg",
    "cassandra-prod",
    "1611250348",
  );
  console.log(result);
}

async function main() {
  await cosmosDBManagedCassandraBackup();
}

main().catch(console.error);
