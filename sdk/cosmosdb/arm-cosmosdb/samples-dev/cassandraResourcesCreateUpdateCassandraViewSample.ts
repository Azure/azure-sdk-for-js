// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update an Azure Cosmos DB Cassandra View
 *
 * @summary create or update an Azure Cosmos DB Cassandra View
 * x-ms-original-file: 2025-11-01-preview/CosmosDBCassandraViewCreateUpdate.json
 */
async function cosmosDBCassandraViewCreateUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraResources.createUpdateCassandraView(
    "rg1",
    "ddb1",
    "keyspacename",
    "viewname",
    {
      options: {},
      resource: {
        id: "viewname",
        viewDefinition:
          "SELECT columna, columnb, columnc FROM keyspacename.srctablename WHERE columna IS NOT NULL AND columnc IS NOT NULL PRIMARY (columnc, columna)",
      },
      tags: {},
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBCassandraViewCreateUpdate();
}

main().catch(console.error);
