// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to online the specified region for the specified Azure Cosmos DB database account.
 *
 * @summary online the specified region for the specified Azure Cosmos DB database account.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBDatabaseAccountOnlineRegion.json
 */
async function cosmosDBDatabaseAccountOnlineRegion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.databaseAccounts.onlineRegion("rg1", "ddb1", { region: "North Europe" });
}

async function main() {
  await cosmosDBDatabaseAccountOnlineRegion();
}

main().catch(console.error);
