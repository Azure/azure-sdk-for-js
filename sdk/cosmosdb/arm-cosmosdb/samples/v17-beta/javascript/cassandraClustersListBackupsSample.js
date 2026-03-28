// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the backups of this cluster that are available to restore.
 *
 * @summary list the backups of this cluster that are available to restore.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBManagedCassandraBackupsList.json
 */
async function cosmosDBManagedCassandraBackupsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cassandraClusters.listBackups(
    "cassandra-prod-rg",
    "cassandra-prod",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cosmosDBManagedCassandraBackupsList();
}

main().catch(console.error);
