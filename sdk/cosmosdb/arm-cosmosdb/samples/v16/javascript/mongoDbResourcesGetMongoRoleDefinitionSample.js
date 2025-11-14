// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Retrieves the properties of an existing Azure Cosmos DB Mongo Role Definition with the given Id.
 *
 * @summary Retrieves the properties of an existing Azure Cosmos DB Mongo Role Definition with the given Id.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2025-10-15/examples/CosmosDBMongoDBRoleDefinitionGet.json
 */
async function cosmosDbMongoRoleDefinitionGet() {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "mySubscriptionId";
  const mongoRoleDefinitionId = "myMongoRoleDefinitionId";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "myResourceGroupName";
  const accountName = "myAccountName";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.mongoDBResources.getMongoRoleDefinition(
    mongoRoleDefinitionId,
    resourceGroupName,
    accountName,
  );
  console.log(result);
}

async function main() {
  await cosmosDbMongoRoleDefinitionGet();
}

main().catch(console.error);
