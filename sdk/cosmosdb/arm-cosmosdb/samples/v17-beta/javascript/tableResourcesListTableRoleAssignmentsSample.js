// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the list of all Azure Cosmos DB Table Role Assignments.
 *
 * @summary retrieves the list of all Azure Cosmos DB Table Role Assignments.
 * x-ms-original-file: 2025-11-01-preview/tablerbac/CosmosDBTableRoleAssignmentList.json
 */
async function cosmosDBTableRoleAssignmentList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tableResources.listTableRoleAssignments(
    "myResourceGroupName",
    "myAccountName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cosmosDBTableRoleAssignmentList();
}

main().catch(console.error);
