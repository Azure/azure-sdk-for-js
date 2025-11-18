// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates an Azure Cosmos DB Gremlin Role Assignment.
 *
 * @summary Creates or updates an Azure Cosmos DB Gremlin Role Assignment.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/gremlinrbac/CosmosDBGremlinRoleAssignmentCreateUpdate.json
 */
async function cosmosDbGremlinRoleAssignmentCreateUpdate() {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "myResourceGroupName";
  const accountName = "myAccountName";
  const roleAssignmentId = "myRoleAssignmentId";
  const createUpdateGremlinRoleAssignmentParameters = {
    principalId: "myPrincipalId",
    roleDefinitionId:
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/gremlinRoleDefinitions/myRoleDefinitionId",
    scope:
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/dbs/purchases/colls/redmond-purchases",
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.gremlinResources.beginCreateUpdateGremlinRoleAssignmentAndWait(
    resourceGroupName,
    accountName,
    roleAssignmentId,
    createUpdateGremlinRoleAssignmentParameters,
  );
  console.log(result);
}

async function main() {
  await cosmosDbGremlinRoleAssignmentCreateUpdate();
}

main().catch(console.error);
