// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the list of all Azure Cosmos DB Gremlin Role Definitions.
 *
 * @summary retrieves the list of all Azure Cosmos DB Gremlin Role Definitions.
 * x-ms-original-file: 2025-11-01-preview/gremlinrbac/CosmosDBGremlinRoleDefinitionList.json
 */
async function cosmosDBGremlinRoleDefinitionList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.gremlinResources.listGremlinRoleDefinitions(
    "myResourceGroupName",
    "myAccountName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cosmosDBGremlinRoleDefinitionList();
}

main().catch(console.error);
