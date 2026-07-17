// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update an Azure Cosmos DB SQL database
 *
 * @summary create or update an Azure Cosmos DB SQL database
 * x-ms-original-file: 2026-03-15/CosmosDBSqlDatabaseCreateUpdate.json
 */
async function cosmosDBSqlDatabaseCreateUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.createUpdateSqlDatabase("rg1", "ddb1", "databaseName", {
    location: "West US",
    tags: {},
    resource: { id: "databaseName" },
    options: {},
  });
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBSqlDatabaseCreateUpdate();
}

main().catch(console.error);
