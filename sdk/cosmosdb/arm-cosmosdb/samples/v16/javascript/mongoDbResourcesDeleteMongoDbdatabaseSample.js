// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes an existing Azure Cosmos DB MongoDB database.
 *
 * @summary Deletes an existing Azure Cosmos DB MongoDB database.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2025-10-15/examples/CosmosDBMongoDBDatabaseDelete.json
 */
async function cosmosDbMongoDbdatabaseDelete() {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const databaseName = "databaseName";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.mongoDBResources.beginDeleteMongoDBDatabaseAndWait(
    resourceGroupName,
    accountName,
    databaseName,
  );
  console.log(result);
}

async function main() {
  await cosmosDbMongoDbdatabaseDelete();
}

main().catch(console.error);
