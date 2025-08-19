// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates an Azure Cosmos DB Mongo Role Definition.
 *
 * @summary Creates or updates an Azure Cosmos DB Mongo Role Definition.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/stable/2025-04-15/examples/CosmosDBMongoDBRoleDefinitionCreateUpdate.json
 */

import {
  MongoRoleDefinitionCreateUpdateParameters,
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function cosmosDbMongoDbroleDefinitionCreateUpdate(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] || "mySubscriptionId";
  const mongoRoleDefinitionId = "myMongoRoleDefinitionId";
  const resourceGroupName =
    process.env["COSMOSDB_RESOURCE_GROUP"] || "myResourceGroupName";
  const accountName = "myAccountName";
  const createUpdateMongoRoleDefinitionParameters: MongoRoleDefinitionCreateUpdateParameters =
    {
      databaseName: "sales",
      privileges: [
        {
          actions: ["insert", "find"],
          resource: { collection: "sales", db: "sales" },
        },
      ],
      roleName: "myRoleName",
      roles: [{ db: "sales", role: "myInheritedRole" }],
    };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.mongoDBResources.beginCreateUpdateMongoRoleDefinitionAndWait(
      mongoRoleDefinitionId,
      resourceGroupName,
      accountName,
      createUpdateMongoRoleDefinitionParameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbMongoDbroleDefinitionCreateUpdate();
}

main().catch(console.error);
