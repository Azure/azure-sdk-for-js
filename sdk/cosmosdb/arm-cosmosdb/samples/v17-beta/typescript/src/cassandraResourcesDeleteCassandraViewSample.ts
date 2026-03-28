// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing Azure Cosmos DB Cassandra view.
 *
 * @summary deletes an existing Azure Cosmos DB Cassandra view.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBCassandraViewDelete.json
 */
async function cosmosDBCassandraViewDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.cassandraResources.deleteCassandraView("rg1", "ddb1", "keyspacename", "viewname");
}

async function main(): Promise<void> {
  await cosmosDBCassandraViewDelete();
}

main().catch(console.error);
