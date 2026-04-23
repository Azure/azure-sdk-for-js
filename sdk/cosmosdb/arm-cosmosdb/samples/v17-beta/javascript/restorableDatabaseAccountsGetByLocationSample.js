// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the properties of an existing Azure Cosmos DB restorable database account.  This call requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/read/*' permission.
 *
 * @summary retrieves the properties of an existing Azure Cosmos DB restorable database account.  This call requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/read/*' permission.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBRestorableDatabaseAccountGet.json
 */
async function cosmosDBRestorableDatabaseAccountGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.restorableDatabaseAccounts.getByLocation(
    "West US",
    "d9b26648-2f53-4541-b3d8-3044f4f9810d",
  );
  console.log(result);
}

async function main() {
  await cosmosDBRestorableDatabaseAccountGet();
}

main().catch(console.error);
