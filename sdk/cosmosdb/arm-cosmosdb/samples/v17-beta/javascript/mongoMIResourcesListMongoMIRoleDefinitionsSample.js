// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the list of all Azure Cosmos DB MongoMI Role Definitions.
 *
 * @summary retrieves the list of all Azure Cosmos DB MongoMI Role Definitions.
 * x-ms-original-file: 2025-11-01-preview/mongoMIrbac/CosmosDBMongoMIRoleDefinitionList.json
 */
async function cosmosDBMongoMIRoleDefinitionList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.mongoMIResources.listMongoMIRoleDefinitions(
    "myResourceGroupName",
    "myAccountName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cosmosDBMongoMIRoleDefinitionList();
}

main().catch(console.error);
