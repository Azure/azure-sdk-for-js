// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the list of all Azure Cosmos DB Mongo Role Definitions.
 *
 * @summary retrieves the list of all Azure Cosmos DB Mongo Role Definitions.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBMongoDBRoleDefinitionList.json
 */
async function cosmosDBMongoDBRoleDefinitionList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.mongoDBResources.listMongoRoleDefinitions(
    "myResourceGroupName",
    "myAccountName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await cosmosDBMongoDBRoleDefinitionList();
}

main().catch(console.error);
