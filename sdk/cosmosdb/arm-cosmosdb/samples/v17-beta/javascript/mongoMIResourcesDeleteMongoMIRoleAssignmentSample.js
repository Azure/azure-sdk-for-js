// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing Azure Cosmos DB MongoMI Role Assignment.
 *
 * @summary deletes an existing Azure Cosmos DB MongoMI Role Assignment.
 * x-ms-original-file: 2025-11-01-preview/mongoMIrbac/CosmosDBMongoMIRoleAssignmentDelete.json
 */
async function cosmosDBMongoMIRoleAssignmentDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.mongoMIResources.deleteMongoMIRoleAssignment(
    "myResourceGroupName",
    "myAccountName",
    "myRoleAssignmentId",
  );
}

async function main() {
  await cosmosDBMongoMIRoleAssignmentDelete();
}

main().catch(console.error);
