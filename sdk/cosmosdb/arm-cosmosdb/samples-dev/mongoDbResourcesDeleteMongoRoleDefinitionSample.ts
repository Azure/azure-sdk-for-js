// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes an existing Azure Cosmos DB Mongo Role Definition.
 *
 * @summary Deletes an existing Azure Cosmos DB Mongo Role Definition.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/stable/2025-04-15/examples/CosmosDBMongoDBRoleDefinitionDelete.json
 */

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function cosmosDbMongoDbroleDefinitionDelete(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] || "mySubscriptionId";
  const mongoRoleDefinitionId = "myMongoRoleDefinitionId";
  const resourceGroupName =
    process.env["COSMOSDB_RESOURCE_GROUP"] || "myResourceGroupName";
  const accountName = "myAccountName";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.mongoDBResources.beginDeleteMongoRoleDefinitionAndWait(
      mongoRoleDefinitionId,
      resourceGroupName,
      accountName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbMongoDbroleDefinitionDelete();
}

main().catch(console.error);
