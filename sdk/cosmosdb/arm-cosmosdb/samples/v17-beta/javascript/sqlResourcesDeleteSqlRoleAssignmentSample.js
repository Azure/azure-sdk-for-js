// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing Azure Cosmos DB SQL Role Assignment.
 *
 * @summary deletes an existing Azure Cosmos DB SQL Role Assignment.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlRoleAssignmentDelete.json
 */
async function cosmosDBSqlRoleAssignmentDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.sqlResources.deleteSqlRoleAssignment(
    "myResourceGroupName",
    "myAccountName",
    "myRoleAssignmentId",
  );
}

async function main() {
  await cosmosDBSqlRoleAssignmentDelete();
}

main().catch(console.error);
