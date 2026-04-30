// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the ClientEncryptionKey under an existing Azure Cosmos DB SQL database.
 *
 * @summary gets the ClientEncryptionKey under an existing Azure Cosmos DB SQL database.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlClientEncryptionKeyGet.json
 */
async function cosmosDBClientEncryptionKeyGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.getClientEncryptionKey(
    "rgName",
    "accountName",
    "databaseName",
    "cekName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBClientEncryptionKeyGet();
}

main().catch(console.error);
