// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the list of all Azure Cosmos DB MongoMI Role Assignments.
 *
 * @summary retrieves the list of all Azure Cosmos DB MongoMI Role Assignments.
 * x-ms-original-file: 2025-11-01-preview/mongoMIrbac/CosmosDBMongoMIRoleAssignmentList.json
 */
async function cosmosDBMongoMIRoleAssignmentList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.mongoMIResources.listMongoMIRoleAssignments(
    "myResourceGroupName",
    "myAccountName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cosmosDBMongoMIRoleAssignmentList();
}

main().catch(console.error);
