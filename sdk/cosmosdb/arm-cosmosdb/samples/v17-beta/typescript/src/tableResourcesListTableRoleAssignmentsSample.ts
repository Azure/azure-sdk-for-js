// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the list of all Azure Cosmos DB Table Role Assignments.
 *
 * @summary retrieves the list of all Azure Cosmos DB Table Role Assignments.
 * x-ms-original-file: 2025-11-01-preview/tablerbac/CosmosDBTableRoleAssignmentList.json
 */
async function cosmosDBTableRoleAssignmentList(): Promise<void> {
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

async function main(): Promise<void> {
  await cosmosDBTableRoleAssignmentList();
}

main().catch(console.error);
