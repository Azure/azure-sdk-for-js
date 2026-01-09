// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes an existing Azure Cosmos DB Table Role Assignment.
 *
 * @summary Deletes an existing Azure Cosmos DB Table Role Assignment.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/tablerbac/CosmosDBTableRoleAssignmentDelete.json
 */
async function cosmosDbTableRoleAssignmentDelete() {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "myResourceGroupName";
  const accountName = "myAccountName";
  const roleAssignmentId = "myRoleAssignmentId";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.tableResources.beginDeleteTableRoleAssignmentAndWait(
    resourceGroupName,
    accountName,
    roleAssignmentId,
  );
  console.log(result);
}

async function main() {
  await cosmosDbTableRoleAssignmentDelete();
}

main().catch(console.error);
