// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the access keys for the specified Azure Cosmos DB database account.
 *
 * @summary lists the access keys for the specified Azure Cosmos DB database account.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBDatabaseAccountListKeys.json
 */
async function cosmosDBDatabaseAccountListKeys(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.databaseAccounts.listKeys("rg1", "ddb1");
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBDatabaseAccountListKeys();
}

main().catch(console.error);
