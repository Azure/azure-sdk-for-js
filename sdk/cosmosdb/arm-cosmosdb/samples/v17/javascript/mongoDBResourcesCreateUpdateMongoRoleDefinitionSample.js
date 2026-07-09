// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an Azure Cosmos DB Mongo Role Definition.
 *
 * @summary creates or updates an Azure Cosmos DB Mongo Role Definition.
 * x-ms-original-file: 2026-03-15/CosmosDBMongoDBRoleDefinitionCreateUpdate.json
 */
async function cosmosDBMongoDBRoleDefinitionCreateUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.mongoDBResources.createUpdateMongoRoleDefinition(
    "myResourceGroupName",
    "myAccountName",
    "myMongoRoleDefinitionId",
    {
      roleName: "myRoleName",
      databaseName: "sales",
      privileges: [{ resource: { db: "sales", collection: "sales" }, actions: ["insert", "find"] }],
      roles: [{ role: "myInheritedRole", db: "sales" }],
    },
  );
  console.log(result);
}

async function main() {
  await cosmosDBMongoDBRoleDefinitionCreateUpdate();
}

main().catch(console.error);
