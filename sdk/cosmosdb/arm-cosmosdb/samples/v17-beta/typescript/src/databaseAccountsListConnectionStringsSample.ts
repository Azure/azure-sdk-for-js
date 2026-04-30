// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the connection strings for the specified Azure Cosmos DB database account.
 *
 * @summary lists the connection strings for the specified Azure Cosmos DB database account.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBDatabaseAccountListConnectionStrings.json
 */
async function cosmosDBDatabaseAccountListConnectionStrings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.databaseAccounts.listConnectionStrings("rg1", "ddb1");
  console.log(result);
}

/**
 * This sample demonstrates how to lists the connection strings for the specified Azure Cosmos DB database account.
 *
 * @summary lists the connection strings for the specified Azure Cosmos DB database account.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBDatabaseAccountListConnectionStringsMongo.json
 */
async function cosmosDBDatabaseAccountListConnectionStringsMongo(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.databaseAccounts.listConnectionStrings("rg1", "mongo-ddb1");
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBDatabaseAccountListConnectionStrings();
  await cosmosDBDatabaseAccountListConnectionStringsMongo();
}

main().catch(console.error);
