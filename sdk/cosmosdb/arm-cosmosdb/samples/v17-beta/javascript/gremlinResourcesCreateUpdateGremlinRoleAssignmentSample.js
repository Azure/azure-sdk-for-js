// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an Azure Cosmos DB Gremlin Role Assignment.
 *
 * @summary creates or updates an Azure Cosmos DB Gremlin Role Assignment.
 * x-ms-original-file: 2025-11-01-preview/gremlinrbac/CosmosDBGremlinRoleAssignmentCreateUpdate.json
 */
async function cosmosDBGremlinRoleAssignmentCreateUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.gremlinResources.createUpdateGremlinRoleAssignment(
    "myResourceGroupName",
    "myAccountName",
    "myRoleAssignmentId",
    {
      principalId: "myPrincipalId",
      roleDefinitionId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/gremlinRoleDefinitions/myRoleDefinitionId",
      scope:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/dbs/purchases/colls/redmond-purchases",
    },
  );
  console.log(result);
}

async function main() {
  await cosmosDBGremlinRoleAssignmentCreateUpdate();
}

main().catch(console.error);
