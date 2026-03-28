// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing Azure Cosmos DB Mongo Role Definition.
 *
 * @summary deletes an existing Azure Cosmos DB Mongo Role Definition.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBMongoDBRoleDefinitionDelete.json
 */
async function cosmosDBMongoDBRoleDefinitionDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.mongoDBResources.deleteMongoRoleDefinition(
    "myResourceGroupName",
    "myAccountName",
    "myMongoRoleDefinitionId",
  );
}

async function main() {
  await cosmosDBMongoDBRoleDefinitionDelete();
}

main().catch(console.error);
