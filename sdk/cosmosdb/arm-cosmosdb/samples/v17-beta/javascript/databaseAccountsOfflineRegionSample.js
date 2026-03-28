// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to offline the specified region for the specified Azure Cosmos DB database account.
 *
 * @summary offline the specified region for the specified Azure Cosmos DB database account.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBDatabaseAccountOfflineRegion.json
 */
async function cosmosDBDatabaseAccountOfflineRegion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.databaseAccounts.offlineRegion("rg1", "ddb1", { region: "North Europe" });
}

async function main() {
  await cosmosDBDatabaseAccountOfflineRegion();
}

main().catch(console.error);
