// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an Azure Cosmos DB SQL Role Definition.
 *
 * @summary creates or updates an Azure Cosmos DB SQL Role Definition.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlRoleDefinitionCreateUpdate.json
 */
async function cosmosDBSqlRoleDefinitionCreateUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.createUpdateSqlRoleDefinition(
    "myResourceGroupName",
    "myAccountName",
    "myRoleDefinitionId",
    {
      type: "CustomRole",
      assignableScopes: [
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/dbs/sales",
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/dbs/purchases",
      ],
      permissions: [
        {
          dataActions: [
            "Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/items/create",
            "Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/items/read",
          ],
          notDataActions: [],
        },
      ],
      roleName: "myRoleName",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBSqlRoleDefinitionCreateUpdate();
}

main().catch(console.error);
