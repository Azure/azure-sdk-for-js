// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update an Azure Cosmos DB Cassandra keyspace
 *
 * @summary create or update an Azure Cosmos DB Cassandra keyspace
 * x-ms-original-file: 2025-11-01-preview/CosmosDBCassandraKeyspaceCreateUpdate.json
 */
async function cosmosDBCassandraKeyspaceCreateUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d6beadc3-5469-4109-ab3c-22a036c7e175";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraResources.createUpdateCassandraKeyspace(
    "rg1",
    "ddb1",
    "keyspaceName",
    { location: "West US", options: {}, resource: { id: "keyspaceName" }, tags: {} },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBCassandraKeyspaceCreateUpdate();
}

main().catch(console.error);
