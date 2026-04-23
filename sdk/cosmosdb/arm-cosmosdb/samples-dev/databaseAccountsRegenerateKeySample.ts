// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to regenerates an access key for the specified Azure Cosmos DB database account.
 *
 * @summary regenerates an access key for the specified Azure Cosmos DB database account.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBDatabaseAccountRegenerateKey.json
 */
async function cosmosDBDatabaseAccountRegenerateKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.databaseAccounts.regenerateKey("rg1", "ddb1", { keyKind: "primary" });
}

async function main(): Promise<void> {
  await cosmosDBDatabaseAccountRegenerateKey();
}

main().catch(console.error);
