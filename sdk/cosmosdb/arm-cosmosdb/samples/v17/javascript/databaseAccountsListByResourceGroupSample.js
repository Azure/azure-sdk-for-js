// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the Azure Cosmos DB database accounts available under the given resource group.
 *
 * @summary lists all the Azure Cosmos DB database accounts available under the given resource group.
 * x-ms-original-file: 2026-03-15/CosmosDBDatabaseAccountListByResourceGroup.json
 */
async function cosmosDBDatabaseAccountListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.databaseAccounts.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cosmosDBDatabaseAccountListByResourceGroup();
}

main().catch(console.error);
