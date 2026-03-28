// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the restorable Azure Cosmos DB database accounts available under the subscription. This call requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/read' permission.
 *
 * @summary lists all the restorable Azure Cosmos DB database accounts available under the subscription. This call requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/read' permission.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBRestorableDatabaseAccountNoLocationList.json
 */
async function cosmosDBRestorableDatabaseAccountNoLocationList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.restorableDatabaseAccounts.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cosmosDBRestorableDatabaseAccountNoLocationList();
}

main().catch(console.error);
