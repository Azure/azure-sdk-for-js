// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get details about a specified command that was run asynchronously.
 *
 * @summary get details about a specified command that was run asynchronously.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBManagedCassandraCommandResult.json
 */
async function cosmosDBManagedCassandraCommandResult() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraClusters.getCommandAsync(
    "cassandra-prod-rg",
    "cassandra-prod",
    "318653d0-3da5-4814-b8f6-429f2af0b2a4",
  );
  console.log(result);
}

async function main() {
  await cosmosDBManagedCassandraCommandResult();
}

main().catch(console.error);
