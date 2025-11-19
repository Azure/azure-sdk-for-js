// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes an existing Azure Cosmos DB MongoMI Role Assignment.
 *
 * @summary Deletes an existing Azure Cosmos DB MongoMI Role Assignment.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/mongoMIrbac/CosmosDBMongoMIRoleAssignmentDelete.json
 */
async function cosmosDbMongoMiroleAssignmentDelete(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["COSMOSDB_RESOURCE_GROUP"] || "myResourceGroupName";
  const accountName = "myAccountName";
  const roleAssignmentId = "myRoleAssignmentId";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.mongoMIResources.beginDeleteMongoMIRoleAssignmentAndWait(
      resourceGroupName,
      accountName,
      roleAssignmentId,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbMongoMiroleAssignmentDelete();
}

main().catch(console.error);
