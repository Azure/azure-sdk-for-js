// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates an Azure Cosmos DB Gremlin Role Definition.
 *
 * @summary Creates or updates an Azure Cosmos DB Gremlin Role Definition.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/gremlinrbac/CosmosDBGremlinRoleDefinitionCreateUpdate.json
 */
async function cosmosDbGremlinRoleDefinitionCreateUpdate() {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "myResourceGroupName";
  const accountName = "myAccountName";
  const roleDefinitionId = "myRoleDefinitionId";
  const createUpdateGremlinRoleDefinitionParameters = {
    typePropertiesType: "CustomRole",
    assignableScopes: [
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/dbs/sales",
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/dbs/purchases",
    ],
    permissions: [
      {
        dataActions: [
          "Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/containers/entities/create",
          "Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/containers/entities/read",
        ],
        notDataActions: [],
      },
    ],
    roleName: "myRoleName",
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.gremlinResources.beginCreateUpdateGremlinRoleDefinitionAndWait(
    resourceGroupName,
    accountName,
    roleDefinitionId,
    createUpdateGremlinRoleDefinitionParameters,
  );
  console.log(result);
}

async function main() {
  await cosmosDbGremlinRoleDefinitionCreateUpdate();
}

main().catch(console.error);
