// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to show the event feed of all mutations done on all the Azure Cosmos DB SQL databases under the restorable account.  This helps in scenario where database was accidentally deleted to get the deletion time.  This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission
 *
 * @summary show the event feed of all mutations done on all the Azure Cosmos DB SQL databases under the restorable account.  This helps in scenario where database was accidentally deleted to get the deletion time.  This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission
 * x-ms-original-file: 2025-11-01-preview/CosmosDBRestorableSqlDatabaseList.json
 */
async function cosmosDBRestorableSqlDatabaseList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2296c272-5d55-40d9-bc05-4d56dc2d7588";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.restorableSqlDatabases.list(
    "WestUS",
    "d9b26648-2f53-4541-b3d8-3044f4f9810d",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cosmosDBRestorableSqlDatabaseList();
}

main().catch(console.error);
