// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing Azure Cosmos DB Cassandra table.
 *
 * @summary deletes an existing Azure Cosmos DB Cassandra table.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBCassandraTableDelete.json
 */
async function cosmosDBCassandraTableDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.cassandraResources.deleteCassandraTable("rg1", "ddb1", "keyspaceName", "tableName");
}

async function main(): Promise<void> {
  await cosmosDBCassandraTableDelete();
}

main().catch(console.error);
