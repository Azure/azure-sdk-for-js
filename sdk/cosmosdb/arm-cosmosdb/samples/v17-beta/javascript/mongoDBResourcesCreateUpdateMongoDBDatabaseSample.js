// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or updates Azure Cosmos DB MongoDB database
 *
 * @summary create or updates Azure Cosmos DB MongoDB database
 * x-ms-original-file: 2025-11-01-preview/CosmosDBMongoDBDatabaseCreateUpdate.json
 */
async function cosmosDBMongoDBDatabaseCreateUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.mongoDBResources.createUpdateMongoDBDatabase(
    "rg1",
    "ddb1",
    "databaseName",
    { location: "West US", options: {}, resource: { id: "databaseName" }, tags: {} },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or updates Azure Cosmos DB MongoDB database
 *
 * @summary create or updates Azure Cosmos DB MongoDB database
 * x-ms-original-file: 2025-11-01-preview/CosmosDBMongoDBDatabaseRestore.json
 */
async function cosmosDBMongoDBDatabaseRestore() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.mongoDBResources.createUpdateMongoDBDatabase(
    "rg1",
    "ddb1",
    "databaseName",
    {
      location: "West US",
      options: {},
      resource: {
        createMode: "Restore",
        id: "databaseName",
        restoreParameters: {
          restoreSource:
            "/subscriptions/00000000-1111-2222-3333-444444444444/providers/Microsoft.DocumentDB/locations/WestUS/restorableDatabaseAccounts/restorableDatabaseAccountId",
          restoreTimestampInUtc: new Date("2022-07-20T18:28:00Z"),
          restoreWithTtlDisabled: false,
        },
      },
      tags: {},
    },
  );
  console.log(result);
}

async function main() {
  await cosmosDBMongoDBDatabaseCreateUpdate();
  await cosmosDBMongoDBDatabaseRestore();
}

main().catch(console.error);
