// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all commands currently running on ring info
 *
 * @summary list all commands currently running on ring info
 * x-ms-original-file: 2025-11-01-preview/CosmosDBManagedCassandraListCommand.json
 */
async function cosmosDBManagedCassandraListCommand() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cassandraClusters.listCommand(
    "cassandra-prod-rg",
    "cassandra-prod",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cosmosDBManagedCassandraListCommand();
}

main().catch(console.error);
