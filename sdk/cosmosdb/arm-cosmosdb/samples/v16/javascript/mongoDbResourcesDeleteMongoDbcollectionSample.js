// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes an existing Azure Cosmos DB MongoDB Collection.
 *
 * @summary Deletes an existing Azure Cosmos DB MongoDB Collection.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2025-10-15/examples/CosmosDBMongoDBCollectionDelete.json
 */
async function cosmosDbMongoDbcollectionDelete() {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const databaseName = "databaseName";
  const collectionName = "collectionName";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.mongoDBResources.beginDeleteMongoDBCollectionAndWait(
    resourceGroupName,
    accountName,
    databaseName,
    collectionName,
  );
  console.log(result);
}

async function main() {
  await cosmosDbMongoDbcollectionDelete();
}

main().catch(console.error);
