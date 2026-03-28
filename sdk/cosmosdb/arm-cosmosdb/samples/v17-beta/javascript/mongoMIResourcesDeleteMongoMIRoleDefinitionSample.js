// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing Azure Cosmos DB MongoMI Role Definition.
 *
 * @summary deletes an existing Azure Cosmos DB MongoMI Role Definition.
 * x-ms-original-file: 2025-11-01-preview/mongoMIrbac/CosmosDBMongoMIRoleDefinitionDelete.json
 */
async function cosmosDBMongoMIRoleDefinitionDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.mongoMIResources.deleteMongoMIRoleDefinition(
    "myResourceGroupName",
    "myAccountName",
    "myRoleDefinitionId",
  );
}

async function main() {
  await cosmosDBMongoMIRoleDefinitionDelete();
}

main().catch(console.error);
