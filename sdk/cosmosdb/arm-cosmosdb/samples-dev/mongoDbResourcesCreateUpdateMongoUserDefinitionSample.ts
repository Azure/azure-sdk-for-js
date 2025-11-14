// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  MongoUserDefinitionCreateUpdateParameters} from "@azure/arm-cosmosdb";
import {
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates an Azure Cosmos DB Mongo User Definition.
 *
 * @summary Creates or updates an Azure Cosmos DB Mongo User Definition.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2025-10-15/examples/CosmosDBMongoDBUserDefinitionCreateUpdate.json
 */
async function cosmosDbMongoDbuserDefinitionCreateUpdate(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] || "mySubscriptionId";
  const mongoUserDefinitionId = "myMongoUserDefinitionId";
  const resourceGroupName =
    process.env["COSMOSDB_RESOURCE_GROUP"] || "myResourceGroupName";
  const accountName = "myAccountName";
  const createUpdateMongoUserDefinitionParameters: MongoUserDefinitionCreateUpdateParameters =
    {
      customData: "My custom data",
      databaseName: "sales",
      mechanisms: "SCRAM-SHA-256",
      password: "myPassword",
      roles: [{ db: "sales", role: "myReadRole" }],
      userName: "myUserName",
    };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.mongoDBResources.beginCreateUpdateMongoUserDefinitionAndWait(
      mongoUserDefinitionId,
      resourceGroupName,
      accountName,
      createUpdateMongoUserDefinitionParameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbMongoDbuserDefinitionCreateUpdate();
}

main().catch(console.error);
