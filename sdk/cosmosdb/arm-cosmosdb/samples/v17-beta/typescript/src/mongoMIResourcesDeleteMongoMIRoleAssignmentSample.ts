// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing Azure Cosmos DB MongoMI Role Assignment.
 *
 * @summary deletes an existing Azure Cosmos DB MongoMI Role Assignment.
 * x-ms-original-file: 2025-11-01-preview/mongoMIrbac/CosmosDBMongoMIRoleAssignmentDelete.json
 */
async function cosmosDBMongoMIRoleAssignmentDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.mongoMIResources.deleteMongoMIRoleAssignment(
    "myResourceGroupName",
    "myAccountName",
    "myRoleAssignmentId",
  );
}

async function main(): Promise<void> {
  await cosmosDBMongoMIRoleAssignmentDelete();
}

main().catch(console.error);
