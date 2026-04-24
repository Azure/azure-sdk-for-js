// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the properties of an existing Azure Cosmos DB SQL Role Assignment with the given Id.
 *
 * @summary retrieves the properties of an existing Azure Cosmos DB SQL Role Assignment with the given Id.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlRoleAssignmentGet.json
 */
async function cosmosDBSqlRoleAssignmentGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.getSqlRoleAssignment(
    "myResourceGroupName",
    "myAccountName",
    "myRoleAssignmentId",
  );
  console.log(result);
}

async function main() {
  await cosmosDBSqlRoleAssignmentGet();
}

main().catch(console.error);
