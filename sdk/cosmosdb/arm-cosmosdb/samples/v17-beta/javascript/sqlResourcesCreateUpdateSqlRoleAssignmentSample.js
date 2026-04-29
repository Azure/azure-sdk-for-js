// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an Azure Cosmos DB SQL Role Assignment.
 *
 * @summary creates or updates an Azure Cosmos DB SQL Role Assignment.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlRoleAssignmentCreateUpdate.json
 */
async function cosmosDBSqlRoleAssignmentCreateUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.createUpdateSqlRoleAssignment(
    "myResourceGroupName",
    "myAccountName",
    "myRoleAssignmentId",
    {
      principalId: "myPrincipalId",
      roleDefinitionId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/sqlRoleDefinitions/myRoleDefinitionId",
      scope:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/dbs/purchases/colls/redmond-purchases",
    },
  );
  console.log(result);
}

async function main() {
  await cosmosDBSqlRoleAssignmentCreateUpdate();
}

main().catch(console.error);
