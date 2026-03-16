// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all commands currently running on ring info
 *
 * @summary list all commands currently running on ring info
 * x-ms-original-file: 2025-11-01-preview/CosmosDBManagedCassandraListCommand.json
 */
async function cosmosDBManagedCassandraListCommand(): Promise<void> {
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

async function main(): Promise<void> {
  await cosmosDBManagedCassandraListCommand();
}

main().catch(console.error);
