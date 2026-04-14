// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing Azure Cosmos DB Table Role Assignment.
 *
 * @summary deletes an existing Azure Cosmos DB Table Role Assignment.
 * x-ms-original-file: 2025-11-01-preview/tablerbac/CosmosDBTableRoleAssignmentDelete.json
 */
async function cosmosDBTableRoleAssignmentDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.tableResources.deleteTableRoleAssignment(
    "myResourceGroupName",
    "myAccountName",
    "myRoleAssignmentId",
  );
}

async function main() {
  await cosmosDBTableRoleAssignmentDelete();
}

main().catch(console.error);
