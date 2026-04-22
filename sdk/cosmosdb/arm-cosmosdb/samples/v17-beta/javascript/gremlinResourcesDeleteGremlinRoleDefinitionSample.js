// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing Azure Cosmos DB Gremlin Role Definition.
 *
 * @summary deletes an existing Azure Cosmos DB Gremlin Role Definition.
 * x-ms-original-file: 2025-11-01-preview/gremlinrbac/CosmosDBGremlinRoleDefinitionDelete.json
 */
async function cosmosDBGremlinRoleDefinitionDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.gremlinResources.deleteGremlinRoleDefinition(
    "myResourceGroupName",
    "myAccountName",
    "myRoleDefinitionId",
  );
}

async function main() {
  await cosmosDBGremlinRoleDefinitionDelete();
}

main().catch(console.error);
