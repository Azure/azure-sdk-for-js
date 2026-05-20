// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the access keys for the specified Azure Cosmos DB database account.
 *
 * @summary lists the access keys for the specified Azure Cosmos DB database account.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBDatabaseAccountListKeys.json
 */
async function cosmosDBDatabaseAccountListKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.databaseAccounts.listKeys("rg1", "ddb1");
  console.log(result);
}

async function main() {
  await cosmosDBDatabaseAccountListKeys();
}

main().catch(console.error);
