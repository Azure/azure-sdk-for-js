// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing Azure Cosmos DB Mongo Role Definition.
 *
 * @summary deletes an existing Azure Cosmos DB Mongo Role Definition.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBMongoDBRoleDefinitionDelete.json
 */
async function cosmosDBMongoDBRoleDefinitionDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.mongoDBResources.deleteMongoRoleDefinition(
    "myResourceGroupName",
    "myAccountName",
    "myMongoRoleDefinitionId",
  );
}

async function main(): Promise<void> {
  await cosmosDBMongoDBRoleDefinitionDelete();
}

main().catch(console.error);
