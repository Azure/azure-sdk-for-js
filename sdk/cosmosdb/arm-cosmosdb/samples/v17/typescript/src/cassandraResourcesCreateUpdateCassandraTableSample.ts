// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update an Azure Cosmos DB Cassandra Table
 *
 * @summary create or update an Azure Cosmos DB Cassandra Table
 * x-ms-original-file: 2026-03-15/CosmosDBCassandraTableCreateUpdate.json
 */
async function cosmosDBCassandraTableCreateUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraResources.createUpdateCassandraTable(
    "rg1",
    "ddb1",
    "keyspaceName",
    "tableName",
    {
      location: "West US",
      tags: {},
      resource: {
        id: "tableName",
        defaultTtl: 100,
        schema: {
          columns: [{ name: "columnA", type: "Ascii" }],
          partitionKeys: [{ name: "columnA" }],
          clusterKeys: [{ name: "columnA", orderBy: "Asc" }],
        },
      },
      options: {},
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBCassandraTableCreateUpdate();
}

main().catch(console.error);
