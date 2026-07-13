// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an Azure Cosmos DB SQL Role Assignment.
 *
 * @summary creates or updates an Azure Cosmos DB SQL Role Assignment.
 * x-ms-original-file: 2026-03-15/CosmosDBSqlRoleAssignmentCreateUpdate.json
 */
async function cosmosDBSqlRoleAssignmentCreateUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.createUpdateSqlRoleAssignment(
    "myResourceGroupName",
    "myAccountName",
    "myRoleAssignmentId",
    {
      roleDefinitionId:
        "/subscriptions/mySubscriptionId/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/sqlRoleDefinitions/myRoleDefinitionId",
      scope:
        "/subscriptions/mySubscriptionId/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/dbs/purchases/colls/redmond-purchases",
      principalId: "myPrincipalId",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBSqlRoleAssignmentCreateUpdate();
}

main().catch(console.error);
