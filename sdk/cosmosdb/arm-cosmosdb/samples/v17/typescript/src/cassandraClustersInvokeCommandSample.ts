// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to invoke a command like nodetool for cassandra maintenance
 *
 * @summary invoke a command like nodetool for cassandra maintenance
 * x-ms-original-file: 2026-03-15/CosmosDBManagedCassandraCommand.json
 */
async function cosmosDBManagedCassandraCommand(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraClusters.invokeCommand(
    "cassandra-prod-rg",
    "cassandra-prod",
    { command: "nodetool status", host: "10.0.1.12" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBManagedCassandraCommand();
}

main().catch(console.error);
