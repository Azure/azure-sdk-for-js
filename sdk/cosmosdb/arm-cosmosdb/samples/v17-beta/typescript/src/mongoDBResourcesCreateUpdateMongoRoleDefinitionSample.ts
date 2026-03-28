// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an Azure Cosmos DB Mongo Role Definition.
 *
 * @summary creates or updates an Azure Cosmos DB Mongo Role Definition.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBMongoDBRoleDefinitionCreateUpdate.json
 */
async function cosmosDBMongoDBRoleDefinitionCreateUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.mongoDBResources.createUpdateMongoRoleDefinition(
    "myResourceGroupName",
    "myAccountName",
    "myMongoRoleDefinitionId",
    {
      databaseName: "sales",
      privileges: [{ actions: ["insert", "find"], resource: { collection: "sales", db: "sales" } }],
      roleName: "myRoleName",
      roles: [{ db: "sales", role: "myInheritedRole" }],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBMongoDBRoleDefinitionCreateUpdate();
}

main().catch(console.error);
