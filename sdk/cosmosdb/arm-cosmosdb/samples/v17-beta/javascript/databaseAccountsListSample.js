// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the Azure Cosmos DB database accounts available under the subscription.
 *
 * @summary lists all the Azure Cosmos DB database accounts available under the subscription.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBDatabaseAccountList.json
 */
async function cosmosDBDatabaseAccountList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.databaseAccounts.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cosmosDBDatabaseAccountList();
}

main().catch(console.error);
