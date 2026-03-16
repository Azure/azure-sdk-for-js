// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing Azure Cosmos DB MongoMI Role Definition.
 *
 * @summary deletes an existing Azure Cosmos DB MongoMI Role Definition.
 * x-ms-original-file: 2025-11-01-preview/mongoMIrbac/CosmosDBMongoMIRoleDefinitionDelete.json
 */
async function cosmosDBMongoMIRoleDefinitionDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.mongoMIResources.deleteMongoMIRoleDefinition(
    "myResourceGroupName",
    "myAccountName",
    "myRoleDefinitionId",
  );
}

async function main(): Promise<void> {
  await cosmosDBMongoMIRoleDefinitionDelete();
}

main().catch(console.error);
