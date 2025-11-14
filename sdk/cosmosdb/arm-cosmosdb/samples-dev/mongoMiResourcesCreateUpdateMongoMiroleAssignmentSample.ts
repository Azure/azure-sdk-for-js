// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  MongoMIRoleAssignmentResource} from "@azure/arm-cosmosdb";
import {
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates an Azure Cosmos DB MongoMI Role Assignment.
 *
 * @summary Creates or updates an Azure Cosmos DB MongoMI Role Assignment.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/mongoMIrbac/CosmosDBMongoMIRoleAssignmentCreateUpdate.json
 */
async function cosmosDbMongoMiroleAssignmentCreateUpdate(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["COSMOSDB_RESOURCE_GROUP"] || "myResourceGroupName";
  const accountName = "myAccountName";
  const roleAssignmentId = "myRoleAssignmentId";
  const createUpdateMongoMIRoleAssignmentParameters: MongoMIRoleAssignmentResource =
    {
      principalId: "myPrincipalId",
      roleDefinitionId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/mongoMIRoleDefinitions/myRoleDefinitionId",
      scope:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/dbs/purchases/colls/redmond-purchases",
    };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.mongoMIResources.beginCreateUpdateMongoMIRoleAssignmentAndWait(
      resourceGroupName,
      accountName,
      roleAssignmentId,
      createUpdateMongoMIRoleAssignmentParameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbMongoMiroleAssignmentCreateUpdate();
}

main().catch(console.error);
