// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing Azure Cosmos DB Mongo User Definition.
 *
 * @summary deletes an existing Azure Cosmos DB Mongo User Definition.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBMongoDBUserDefinitionDelete.json
 */
async function cosmosDBMongoDBUserDefinitionDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.mongoDBResources.deleteMongoUserDefinition(
    "myResourceGroupName",
    "myAccountName",
    "myMongoUserDefinitionId",
  );
}

async function main(): Promise<void> {
  await cosmosDBMongoDBUserDefinitionDelete();
}

main().catch(console.error);
