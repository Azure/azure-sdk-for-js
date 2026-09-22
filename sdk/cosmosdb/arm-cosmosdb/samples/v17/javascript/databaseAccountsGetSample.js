// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the properties of an existing Azure Cosmos DB database account.
 *
 * @summary retrieves the properties of an existing Azure Cosmos DB database account.
 * x-ms-original-file: 2026-03-15/CosmosDBDatabaseAccountGet.json
 */
async function cosmosDBDatabaseAccountGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.databaseAccounts.get("rg1", "ddb1");
  console.log(result);
}

async function main() {
  await cosmosDBDatabaseAccountGet();
}

main().catch(console.error);
