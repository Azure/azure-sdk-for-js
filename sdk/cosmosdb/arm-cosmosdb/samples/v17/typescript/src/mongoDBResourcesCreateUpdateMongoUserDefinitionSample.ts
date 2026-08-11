// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an Azure Cosmos DB Mongo User Definition.
 *
 * @summary creates or updates an Azure Cosmos DB Mongo User Definition.
 * x-ms-original-file: 2026-03-15/CosmosDBMongoDBUserDefinitionCreateUpdate.json
 */
async function cosmosDBMongoDBUserDefinitionCreateUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.mongoDBResources.createUpdateMongoUserDefinition(
    "myResourceGroupName",
    "myAccountName",
    "myMongoUserDefinitionId",
    {
      userName: "myUserName",
      password: "myPassword",
      databaseName: "sales",
      customData: "My custom data",
      roles: [{ role: "myReadRole", db: "sales" }],
      mechanisms: "SCRAM-SHA-256",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBMongoDBUserDefinitionCreateUpdate();
}

main().catch(console.error);
