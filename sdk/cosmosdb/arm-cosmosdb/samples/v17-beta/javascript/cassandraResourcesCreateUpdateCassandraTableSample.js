// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update an Azure Cosmos DB Cassandra Table
 *
 * @summary create or update an Azure Cosmos DB Cassandra Table
 * x-ms-original-file: 2025-11-01-preview/CosmosDBCassandraTableCreateUpdate.json
 */
async function cosmosDBCassandraTableCreateUpdate() {
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
      options: {},
      resource: {
        schema: {
          clusterKeys: [{ name: "columnA", orderBy: "Asc" }],
          columns: [{ name: "columnA", type: "Ascii" }],
          partitionKeys: [{ name: "columnA" }],
        },
        analyticalStorageTtl: 500,
        defaultTtl: 100,
        id: "tableName",
      },
      tags: {},
    },
  );
  console.log(result);
}

async function main() {
  await cosmosDBCassandraTableCreateUpdate();
}

main().catch(console.error);
