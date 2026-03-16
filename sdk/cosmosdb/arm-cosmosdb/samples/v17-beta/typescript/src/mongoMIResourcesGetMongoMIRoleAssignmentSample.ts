// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the properties of an existing Azure Cosmos DB MongoMI Role Assignment with the given Id.
 *
 * @summary retrieves the properties of an existing Azure Cosmos DB MongoMI Role Assignment with the given Id.
 * x-ms-original-file: 2025-11-01-preview/mongoMIrbac/CosmosDBMongoMIRoleAssignmentGet.json
 */
async function cosmosDBMongoMIRoleAssignmentGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.mongoMIResources.getMongoMIRoleAssignment(
    "myResourceGroupName",
    "myAccountName",
    "myRoleAssignmentId",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBMongoMIRoleAssignmentGet();
}

main().catch(console.error);
