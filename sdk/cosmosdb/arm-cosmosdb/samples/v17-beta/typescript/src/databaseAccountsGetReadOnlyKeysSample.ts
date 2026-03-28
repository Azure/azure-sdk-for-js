// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the read-only access keys for the specified Azure Cosmos DB database account.
 *
 * @summary lists the read-only access keys for the specified Azure Cosmos DB database account.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBDatabaseAccountListReadOnlyKeys_GetReadOnlyKeys.json
 */
async function cosmosDBDatabaseAccountListReadOnlyKeys(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.databaseAccounts.getReadOnlyKeys("rg1", "ddb1");
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBDatabaseAccountListReadOnlyKeys();
}

main().catch(console.error);
