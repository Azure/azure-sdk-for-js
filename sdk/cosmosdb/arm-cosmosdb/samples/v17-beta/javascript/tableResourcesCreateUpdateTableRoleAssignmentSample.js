// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an Azure Cosmos DB Table Role Assignment.
 *
 * @summary creates or updates an Azure Cosmos DB Table Role Assignment.
 * x-ms-original-file: 2025-11-01-preview/tablerbac/CosmosDBTableRoleAssignmentCreateUpdate.json
 */
async function cosmosDBTableRoleAssignmentCreateUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.tableResources.createUpdateTableRoleAssignment(
    "myResourceGroupName",
    "myAccountName",
    "myRoleAssignmentId",
    {
      principalId: "myPrincipalId",
      roleDefinitionId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/tableRoleDefinitions/myRoleDefinitionId",
      scope:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/dbs/purchases/colls/redmond-purchases",
    },
  );
  console.log(result);
}

async function main() {
  await cosmosDBTableRoleAssignmentCreateUpdate();
}

main().catch(console.error);
