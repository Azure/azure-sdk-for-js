// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  TableRoleDefinitionResource} from "@azure/arm-cosmosdb";
import {
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates an Azure Cosmos DB Table Role Definition.
 *
 * @summary Creates or updates an Azure Cosmos DB Table Role Definition.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/tablerbac/CosmosDBTableRoleDefinitionCreateUpdate.json
 */
async function cosmosDbTableRoleDefinitionCreateUpdate(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["COSMOSDB_RESOURCE_GROUP"] || "myResourceGroupName";
  const accountName = "myAccountName";
  const roleDefinitionId = "myRoleDefinitionId";
  const createUpdateTableRoleDefinitionParameters: TableRoleDefinitionResource =
    {
      typePropertiesType: "CustomRole",
      assignableScopes: [
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/dbs/sales",
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/dbs/purchases",
      ],
      permissions: [
        {
          dataActions: [
            "Microsoft.DocumentDB/databaseAccounts/tableDatabases/containers/entities/create",
            "Microsoft.DocumentDB/databaseAccounts/tableDatabases/containers/entities/read",
          ],
          notDataActions: [],
        },
      ],
      roleName: "myRoleName",
    };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.tableResources.beginCreateUpdateTableRoleDefinitionAndWait(
      resourceGroupName,
      accountName,
      roleDefinitionId,
      createUpdateTableRoleDefinitionParameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbTableRoleDefinitionCreateUpdate();
}

main().catch(console.error);
