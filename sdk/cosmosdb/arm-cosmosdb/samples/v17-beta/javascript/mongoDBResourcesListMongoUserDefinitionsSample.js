// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the list of all Azure Cosmos DB Mongo User Definition.
 *
 * @summary retrieves the list of all Azure Cosmos DB Mongo User Definition.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBMongoDBUserDefinitionList.json
 */
async function cosmosDBMongoDBUserDefinitionList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.mongoDBResources.listMongoUserDefinitions(
    "myResourceGroupName",
    "myAccountName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cosmosDBMongoDBUserDefinitionList();
}

main().catch(console.error);
