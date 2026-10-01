// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update an Azure Cosmos DB Cassandra keyspace
 *
 * @summary create or update an Azure Cosmos DB Cassandra keyspace
 * x-ms-original-file: 2026-03-15/CosmosDBCassandraKeyspaceCreateUpdate.json
 */
async function cosmosDBCassandraKeyspaceCreateUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraResources.createUpdateCassandraKeyspace(
    "rg1",
    "ddb1",
    "keyspaceName",
    { location: "West US", tags: {}, resource: { id: "keyspaceName" }, options: {} },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBCassandraKeyspaceCreateUpdate();
}

main().catch(console.error);
