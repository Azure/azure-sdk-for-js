// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks that the Azure Cosmos DB account name already exists. A valid account name may contain only lowercase letters, numbers, and the '-' character, and must be between 3 and 50 characters.
 *
 * @summary checks that the Azure Cosmos DB account name already exists. A valid account name may contain only lowercase letters, numbers, and the '-' character, and must be between 3 and 50 characters.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBDatabaseAccountCheckNameExists.json
 */
async function cosmosDBDatabaseAccountCheckNameExists(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential);
  await client.databaseAccounts.checkNameExists("ddb1");
}

async function main(): Promise<void> {
  await cosmosDBDatabaseAccountCheckNameExists();
}

main().catch(console.error);
