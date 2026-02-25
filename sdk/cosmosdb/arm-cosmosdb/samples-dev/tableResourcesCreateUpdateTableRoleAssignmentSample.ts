// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  TableRoleAssignmentResource} from "@azure/arm-cosmosdb";
import {
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates an Azure Cosmos DB Table Role Assignment.
 *
 * @summary Creates or updates an Azure Cosmos DB Table Role Assignment.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/tablerbac/CosmosDBTableRoleAssignmentCreateUpdate.json
 */
async function cosmosDbTableRoleAssignmentCreateUpdate(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["COSMOSDB_RESOURCE_GROUP"] || "myResourceGroupName";
  const accountName = "myAccountName";
  const roleAssignmentId = "myRoleAssignmentId";
  const createUpdateTableRoleAssignmentParameters: TableRoleAssignmentResource =
    {
      principalId: "myPrincipalId",
      roleDefinitionId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/tableRoleDefinitions/myRoleDefinitionId",
      scope:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/dbs/purchases/colls/redmond-purchases",
    };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.tableResources.beginCreateUpdateTableRoleAssignmentAndWait(
      resourceGroupName,
      accountName,
      roleAssignmentId,
      createUpdateTableRoleAssignmentParameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbTableRoleAssignmentCreateUpdate();
}

main().catch(console.error);
