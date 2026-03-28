// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an Azure Cosmos DB Table Role Definition.
 *
 * @summary creates or updates an Azure Cosmos DB Table Role Definition.
 * x-ms-original-file: 2025-11-01-preview/tablerbac/CosmosDBTableRoleDefinitionCreateUpdate.json
 */
async function cosmosDBTableRoleDefinitionCreateUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.tableResources.createUpdateTableRoleDefinition(
    "myResourceGroupName",
    "myAccountName",
    "myRoleDefinitionId",
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
    },
  );
  console.log(result);
}

async function main() {
  await cosmosDBTableRoleDefinitionCreateUpdate();
}

main().catch(console.error);
