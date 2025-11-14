// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes an existing Azure Cosmos DB SQL Role Definition.
 *
 * @summary Deletes an existing Azure Cosmos DB SQL Role Definition.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2025-10-15/examples/CosmosDBSqlRoleDefinitionDelete.json
 */
async function cosmosDbSqlRoleDefinitionDelete() {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "mySubscriptionId";
  const roleDefinitionId = "myRoleDefinitionId";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "myResourceGroupName";
  const accountName = "myAccountName";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.beginDeleteSqlRoleDefinitionAndWait(
    roleDefinitionId,
    resourceGroupName,
    accountName,
  );
  console.log(result);
}

async function main() {
  await cosmosDbSqlRoleDefinitionDelete();
}

main().catch(console.error);
